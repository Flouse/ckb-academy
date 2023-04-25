# CKB Academy

Welcome to CKB Academy, an interactive learning space for [Nervos](https://www.nervos.org) developers.

CKB Academy is committed to ensuring that new CKB developers have an easy learning curve, by providing easy-to-understand, interactive courses and friendly documentation.
Our mission is to foster a robust ecosystem around Nervos Network by providing developers with all the tools and resources they need to create innovative applications and solutions.
We look forward to having you join us as part of our growing community.

This project is going to build a comprehensive set of guides, tutorials, labs, and sandbox environments to help developers learn and test their knowledge of Nervos CKB, allowing developers to learn at their own pace.

## TODO list

- [ ] Gather and organize more available study materials, transform them into interactive learning courses
  - [ ] [Refactor zero2ckb training course](https://github.com/Flouse/ckb-academy/issues/3) | send a pkp2h transaction
  - [ ] [Nervos Developer Training Course](https://nervos.gitbook.io/developer-training-course/)
  - [ ] Send a multisig transaction
  - [ ] Deploy a simple contract
  - [ ] Deploy a upgradable contract
  - [ ] etc.
- [ ] Provide clear guidance on how to contribute to the project and get involved in the CKB community
  - [ ] Add a guild about how to build a new interactive course using the template designed in this project
- [ ] [Message Board](https://github.com/Flouse/ckb-academy/issues/5)
- [ ] Include a frequently asked questions (FAQ) section to address common questions or issues
  - [ ] Give an overview of Nervos CKB
  - [ ] Explain the benefits of learning about CKB and how it can be applied in various use cases
  - [ ] List out any prerequisites or recommended knowledge that learners should have before diving into the courses
- [ ] [Learn CKB and Earn NFTs with Game Experience](https://github.com/Flouse/ckb-academy/issues/4)
- [ ] Provide examples of successful projects and applications built on the CKB, such as the layer-2 sulutions ([Godwoken](https://github.com/godwokenrises/godwoken) and [Axon](https://github.com/axonweb3/axon)), [.bit](https://www.dotbit.org/)
- [ ] [SEO-friendly Design](https://github.com/Flouse/ckb-academy/issues/6)

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
yarn dev
#or
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

solid-start start starts the production build with a local version of adapter.

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
