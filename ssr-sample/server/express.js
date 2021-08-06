const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const axios = require('axios');
const bodyParser = require('body-parser');

// create express application
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import App component
const { App } = require( '../src/components/app' ); 

// serve static assets
app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

app.post( '/api', async ( req, res ) => {
    const email = req.body.email;
    try {
        const result = await axios.post('https://script.google.com/macros/s/AKfycbwYl0Pf1tp-R_n1MiLq4vJq7foltArAlgpmutE5nrKcuuSXnuMZnU0CsjDCz9cJi1O0OQ/exec', {email: email});
        res.json({status: 'success'});
    } catch(e) {
        res.json({status: 'fail'});
    } 
});

// detail
app.get( '/detail', ( req, res ) => {

    // read `index.html` file
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/detail/index.html' ), {
        encoding: 'utf8',
    } );

    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString( <App /> );

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace( '<div id="app"></div>', `<div id="app">${ appHTML }</div>` );

    // set header and status
    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );
} );

// for any other requests, send `index.html` as a response
app.use( '*', ( req, res ) => {

    // read `index.html` file
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
        encoding: 'utf8',
    } );

    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString( <App /> );

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace( '<div id="app"></div>', `<div id="app">${ appHTML }</div>` );

    // set header and status
    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );
} );

// run express server on port 9000
app.listen( '9000', () => {
    console.log( 'Express server started at http://localhost:9000' );
} );
