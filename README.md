# CKB Academy

Welcome to CKB Academy, an interactive learning space for [Nervos](https://www.nervos.org) developers.

CKB Academy is committed to ensuring that new CKB developers have an easy learning curve, by providing easy-to-understand, interactive courses and friendly documentation.
Our mission is to foster a robust ecosystem around Nervos Network by providing developers with all the tools and resources they need to create innovative applications and solutions.
We look forward to having you join us as part of our growing community.

At the current stage, CKB Academy is dedicated to solving the problem of "scattered" or "fragmented" information, becoming a landing page for Nervos development resources, collecting and organizing various tutorials, how-to guides, references, explanations and other educational content worth highlighting.

In the future, we hope CKB Academy will become a comprehensive [Documentation System][1] / Library / Playground etc.

## Sitemap
- Courses: a list of interactive courses covering various topics related to Nervos development
- Library: a collection of how-to articles, references, explanations and other documentation resources
- Playground (Labs): a set of sandbox environments where developers can experiment with Nervos development and test their code


## TODO list

- Gather and organize available study materials worth highlighting
  - [x] [Nervos Developer Training Course](https://nervos.gitbook.io/developer-training-course/)
  - [ ] [Nervos Network Developers Resources Hub](https://talk.nervos.org/t/nervos-network-developers-resources-hub/7261)
  
- Interactive learning courses
  - [x] [Refactor zero2ckb training course](https://github.com/Flouse/ckb-academy/issues/3) | send a pkp2h transaction
     - https://academy.ckb.dev/courses/basic-theory
     - https://academy.ckb.dev/courses/basic-operation
  - [ ] [Write an SUDT Script by Capsule](https://docs.nervos.org/docs/labs/sudtbycapsule/)
  - [ ] Send a multisig transaction
  - [ ] Deploy a simple contract
  - [ ] Deploy a upgradable contract
  - [ ] etc.

- Playground (Labs)
  - [ ] [Time to Hello World on CKB](https://github.com/Flouse/ckb-tthw/tree/main/js)
    -> demo: https://ckb-tthw.vercel.app

- [ ] Provide clear guidance on how to contribute to the project and get involved in the CKB community
  - [ ] Add a guild about how to build a new interactive course using the template designed in this project
- [ ] [Learn CKB and Earn NFTs with Game Experience](https://github.com/Flouse/ckb-academy/issues/4)
- [ ] [SEO-friendly Design](https://github.com/Flouse/ckb-academy/issues/6)
- [ ] Provide examples of successful projects and applications built on the CKB, such as the layer-2 sulutions ([Godwoken](https://github.com/godwokenrises/godwoken) and [Axon](https://github.com/axonweb3/axon)), [.bit](https://www.dotbit.org/)


## Monorepo
This project uses [Turborepo](https://turbo.build/repo/docs) as the `Monorepo` solution, with the [site](./site) directory serving as the primary workspace of the entire project and the [packages](./packages) directory serving as the storage location for all internal packages included in this project.


## Developing

The front-end of this project is powered by [SolidStart](https://start.solidjs.com).

```bash
# install dependencies
yarn

# Install Git hook to achieve code formatting during code submission.
yarn run prepare

# start a development server: https://start.solidjs.com/api/dev
yarn dev:site
# or
turbo run dev
```

## Building

`solid-start` build bundles your server and client using [Vite](https://vitejs.dev/).

```bash
# https://start.solidjs.com/api/build
yarn build
# or
turbo run build
```

The `output` directory will appear in `site/dist/public`.

```bash
# https://start.solidjs.com/api/start
yarn start
```

## Contributing

If you find a bug or you want to contribute to the project, please submit an issue or a pull request.

<a href="https://gitpod.io/#https://github.com/Flouse/ckb-academy">
  <img
    src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod"
    alt="Contribute with Gitpod"
  />
</a> without having to go through the entire setup process.

## License

The code in this repository is released under the MIT License.


[1]: https://documentation.divio.com/
