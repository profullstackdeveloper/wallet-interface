<a name="readme-top"></a>

# Wallet Interface
<details>
<summary>Table of Contents</summary>
<ol>
<li>
<a href="#about-the-project">About The Project</a>
<ul>
<li>
<a href="#built-with">Built With</a>
</li>
<li>
<a href="#getting-started">Getting Started</a>
<ul>
<li><a href="#environment">Environment</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#installation">Installation</a></li>
</ul>
</li>
</ol>
</details>

## About The Project
This is the Application for creating new Ethereum wallet or import from Mnemonic key.

And checking the current account's balance and handle transaction to send Eth to the other account.
<p align="right">(<a href="#readme-top">Back to top</a>)</p>


### Built With


* <b>React</b>
* <b>Typescript</b>
* <b>Material UI</b>
* <b>Tailwind CSS</b>
* <b>Tauri</b>
* <b>Rust</b>
* <b>Web3</b>

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

### Getting Started

To install and run the project successfully, please follow the instructions.

#### Environment
```
Node version >= 18.0
```
Please be sure that Rust is already installed in the machine.
<p align="right">(<a href="#readme-top">Back to top</a>)</p>


#### Installation

```bash
git clone https://github.com/profullstackdeveloper/wallet-interface.git

cd wallet-interface

npm install
```

After finishing installation of required modules, then please be sure that env files are already implemented correctly.

This step will finish the installation for the ``wallet-interface`` project.

To runn the project, then:
```bash
npm run tauri:dev
```

Once the project is run, then app will popup. 
Then we can check our application.

To build the project, then:
```bash
npm run tauri:build
```
After building, `.exe` file can be found in the location: ``./src-tauri/target/release/``
<br></br>
`.deb` file can be found in the location: ``./src-tauri/target/release/bundle/`` 

<p align="right">(<a href="#readme-top">Back to top</a>)</p>
