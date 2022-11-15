import { ServiceName } from './service.model';

export interface Terms {
  name: string;
  url: string;
  title: string;
}

export interface IServiceTerms {
  [key: string]: Terms
}

export const ServiceTerms: IServiceTerms = {
  'spotify': {
    name: 'SPOTIFY T&Cs',
    url: 'https://www.spotify.com/sg-en/legal/end-user-agreement/',
    title: 'Spotify Terms and Conditions of Use'
  },
  'netflix': {
    name: 'NETFLIX T&Cs',
    url: 'https://help.netflix.com/legal/termsofuse',
    title: 'Netflix Terms of Use'
  },
  'disney_plus': {
    name: 'DISNEY+ T&Cs',
    url: 'https://www.disneyplus.com/legal/subscriber-agreement',
    title: '',
  },
  'apple_tv_plus': {
    name: 'Apple TV+  T&Cs',
    url: 'https://www.apple.com/legal/internet-services/itunes/us/terms.html',
    title: 'Apple Media Services Terms and Conditions',
  },
  'youtube_premium': {
    name: 'YouTube Premium  T&Cs',
    url: 'https://www.youtube.com/t/terms_paidservice',
    title: 'YouTube Premium Terms and Conditions',
  },
  "nitendo switch online": {
    name: 'Nintendo Switch Online T&Cs',
    url: 'https://www.nintendo.com/purchase-terms',
    title: 'Nintendo Switch Online Terms and Conditions',
  },
  "nitendo_switch_online": {
    name: 'Nintendo Switch Online T&Cs',
    url: 'https://www.nintendo.com/purchase-terms',
    title: 'Nintendo Switch Online Terms and Conditions',
  }
}
