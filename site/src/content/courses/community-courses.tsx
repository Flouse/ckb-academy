import { Course, CourseSource, CourseType } from '~/types/course';
import { contributorsData } from '~/data/contributors.data';

export const communityCourses: Course[] = [
  {
    id: 'f7529fa51cdb3c98',
    name: 'L1 Developer Training Course',
    coverPicture: '/images/course/nervos-gitbook.png',
    description:
      'This lesson plan is designed to teach developers, who are familiar with blockchain, how to build common application components on Nervos CKB L1. We will walk through a series of examples and lab exercises designed to help you learn the essentials through practical hands-on experience.',
    author: [contributorsData.NervosNetwork],
    type: CourseType.Article,
    source: CourseSource.Community,
    updateTime: '2023/4/20',
    url: 'https://nervos.gitbook.io/developer-training-course/',
  },
  {
    id: '0a2a83e7ec018980',
    name: 'Dapps with CKB Workshop',
    coverPicture: '/images/course/nervos.png',
    description: () => (
      <>
        <p>This lecture includes three parts:</p>
        <p>
          1. In the first part, I will show you the basic concepts of developing on CKB, including
          some commonly used patterns for developing on CKB.
        </p>
        <p>
          2. In the second part, I will demonstrate how to use the tool designed by capsule to write
          on-chain contracts in the language Rust.
        </p>
        <p>
          3. Lastly, I will use Lumos, the other framework we provide, to tell you how Dapps wrote
          in JavaScript or TypeScript interact with the blockchain to fulfill your needs.
        </p>
      </>
    ),
    author: [contributorsData.NervosNetwork],
    type: CourseType.Video,
    source: CourseSource.Community,
    updateTime: '2023/4/20',
    url: 'https://www.youtube.com/watch?v=iVjccs3z5q0&list=PLRke1-EE4VWFirxtxtXmW7enINVZP2Lk6',
  },
  {
    id: '7de29a0ec5e708a7',
    name: 'Construct and Send Your First CKB Transaction',
    coverPicture: '/images/course/cryptape.png',
    description:
      'This post is a concise and easy-to-follow tutorial on how to construct and send a transaction in CKB. Step by step, you will learn how to create an address from scratch, how to claim and send coins to complete a transaction.',
    author: [contributorsData.Cryptape],
    type: CourseType.Article,
    source: CourseSource.Community,
    updateTime: '2023/4/20',
    url: 'https://blog.cryptape.com/construct-and-send-your-first-ckb-transaction',
  },
  {
    id: 'f24fee9a95ac22e2',
    name: 'CKB Script Programming Series',
    coverPicture: '/images/course/developer-blog.png',
    description: 'This tutorial is from the CKB VM Core developer',
    author: [contributorsData.Xxuejie],
    type: CourseType.Article,
    source: CourseSource.Community,
    updateTime: '2023/4/20',
    url: 'https://xuejie.space/',
  },
  {
    id: 'c4b34eaf6f6a5ca1',
    name: 'Start Your CKB Development Journey',
    coverPicture: '/images/course/cryptape.png',
    description:
      "In the past month, Cryptape and MIT Bitcoin Expo both hosted CKB hackathons that provided developers with an opportunity to explore the CKB blockchain platform. Attendees were able to learn about CKB's unique Cell Model and its capabilities for creating complex smart contracts. ",
    author: [contributorsData.Cryptape],
    type: CourseType.Article,
    source: CourseSource.Community,
    updateTime: '2023/5/15',
    url: 'https://blog.cryptape.com/start-your-ckb-development-journey',
  },
];
