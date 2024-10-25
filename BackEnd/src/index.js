import app from './app.js';

const main = () =>{
    app.listen(app.get('port'));
    console.log('Sever on port', app.get('port'));
}

main();