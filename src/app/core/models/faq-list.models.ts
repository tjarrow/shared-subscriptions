export interface FaqItem {
  question: string;
  answer: string;
}

export const FaqList: FaqItem[] = [
  {
    question: 'What is Shareit?',
    answer: 'It’s a service that allows you to share the cost of a subscription with your friends and family or to find co-subscribers via our marketplace.'
  },
  {
    question: 'How does it work?',
    answer: `There are 2 ways:
    <p>As an owner of a subscription, you can make your empty slots available to the community and start saving.</p>
    <p>As a subscriber, you can co-share a subscription with the owner for a fraction of the retail price.</p>`
  },
  {
    question: 'How do I get access to the subscription?',
    answer: 'Shareit team will reach out to you and communicate the instructions. It’s simple!'
  },
  {
    question: 'As subscriber, what if I lose access to the service?',
    answer: `You have 25 days to raise any issue to Shareit team. We’ll investigate the issue with the owner.
    If no solution is found within 5 workings days, you’ll get the refund. No question asked.`
  },
  {
    question: 'As owner, how can I get paid?',
    answer: 'The payments are fully automated. You’ll be paid on a monthly basis. The amount will be wired directly to your bank account.'
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.'
  },
  {
    question: 'My favourite Subscription Service is not available on Shareit. What can I do?',
    answer: 'You can reach out to our friendly Shareit team to share this idea! We’ll do our best to add after reviewing it.'
  },
  {
    question: 'Is it legal?',
    answer: `Yes, Group or family Subscription Plans are made for that purpose. Although they have a higher price compared
    to basic plans, it allows users to share access to products and services in a group, provided that the terms of use are respected.`
  },
]
