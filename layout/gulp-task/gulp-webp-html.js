const PluginError = require('plugin-error');
const through = require('through2');

module.exports = function(extensions){
  let ext = extensions || ['.jpg', '.png', '.jpeg', 'JPG', 'tif', 'tiff', 'TIFF', 'TIF'];
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError('gulp-webp-html', 'Streaming not supported'));
            return;
        }

        try {
          const pictureRender = (url, imgTag) => '<picture><source srcset="' + url + '" type="image/webp">' + imgTag + '</picture>';
          const getUrlExtension = (url) => '.' + url.split(/[#?]/)[0].split('.').pop().trim();

            let inPicture = false;
            const data = file.contents.toString()
                    .split('\n')
                    .map(function(line){
                        // Вне <picture/>?
                        if (line.indexOf('<picture') + 1) inPicture = true;
                        if (line.indexOf('</picture') + 1) inPicture = false;

                        // Проверяем есть ли <img/>
                        if ((line.indexOf('<img') + 1) && !inPicture) {
                          // Новый урл с .webp
                          const Re = /<img([^>]*)src=\"(\S+)\"([^>]*)>/ig;
                          const regexpArray = Re.exec(line);
                          const imgTag = regexpArray[0];
                          const url = regexpArray[2];
                          const fileExtension = getUrlExtension(url)

                          if (!ext.includes(fileExtension)) return line;

                          const newHTML = pictureRender(url.replace(fileExtension, '.webp'), imgTag);
                          return line.replace(imgTag, newHTML);
                        }
                        return line;
                    })
                    .join('\n');
            file.contents = new Buffer.from(data);
            this.push(file);
        } catch (err) {
          this.emit('gulp-webp-html error', new PluginError(pluginName, err));
        }

        cb();
    });
};
