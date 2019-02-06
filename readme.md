# Here is the JS-LOL team's project to conquer the world

Help us conquer the world, Minus & Cortex style.
We need your brilliant ideas. To this end, we made a webpage where you can put every idea you have.
Go check it out, and if you have a dark soul like us, you will like it a lot.
The only barrier is your imagination, and we, at JS-LOL, know it is limitless.
Good conquest of the earth, and may the odds be not in your favor.

**See below for technical questions**  
*For this exercise we used a Becode template that we have modified at our convenience*  
*What you see below is rather for the developer*  

# JavaScript Idea manager  

This is a simple webapp used to manage ideas to conquer the world  

[Link to the app](https://rabujev.github.io/jepsen-js-web-JSLOL/)

## Usage guide

### Installing dependencies

This project uses [npm](https://www.npmjs.com/) to download its dependencies. To install everything it needs just type:

```bash
npm install
```

### Running the project

You can't just open the `index.html` file with your web browser as this project depends on a build system named [Parcel](https://parceljs.org/). It takes care of a lot of boring tasks like rewriting the JavaScript to work on older browsers or compiling SCSS files to CSS. It doesn't mean it's complicated to use.

Just type this command to launch a small web server that propose your JavaScript application and automatically recompile your code when you modify it:

```bash
npm run dev
```

Your application can then be consulted at `http://localhost:1234`.

### Building for production

If you want to deploy this website for real you must first build it with this command:

```bash
npm run build
```

The result of the build will then be available in the `docs` folder. Then commit and push.

As long as your project as been properly configured to enable Github Pages on the `docs` folder it will be published.

## Files

* [index.html](./index.html): The HTML file. Contains the web page of the webapp, where you can add new idea
* [style.scss](./style.scss): A [SCSS](https://sass-lang.com/) file that will automatically be compiled to CSS to be loaded by the HTML file. It take cares of the layout, style and so on.
* [script.js](./script.js): the core of the functionnality you see on the webapp.

## Integrated libraries

This template already integrate some libraries and tools:

* [Bootstrap](https://getbootstrap.com/): A CSS framework containing a lot of useful components, both in CSS and JavaScript. This template uses the [Litera](https://bootswatch.com/litera/) Bootstrap template.
* [Font Awesome](https://fontawesome.com/): A library of icons that we can use to display nice little icons everywhere. There are even cats in it :smiley_cat: !
* [Markdown](https://www.npmjs.com/package/markdown): A library that is used to convert Markdon into Html  
And other dependencies (like JQuery for Bootstrap) You can find them in the package.json.

## Last words  
This project was our first group project. We are Junior Web Developer, so be tolerant. We did our best. Don't hesitate to give us feedback, so that we know where we need to improve our skills.
Enjoy, and give us your evilest idea to conquer this world.

From the mightiest JS-LOL
