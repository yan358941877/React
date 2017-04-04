import _ from 'lodash';
import $ from 'jquery';
import foo from './foo';

function component() {
    //var element = document.createElement('div');
    //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    ////return element;

    var element = $('<div></div>');
    element.html(_.join(['Hi', 'webpack'], ' '));
    return element.get(0);
}

document.body.appendChild(component());
console.log(foo);
console.log(foo());