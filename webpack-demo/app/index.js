import _ from 'lodash';
import $ from 'jquery';

function component() {
    //var element = document.createElement('div');
    //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    ////return element;

    var element = $('<div></div>');
    element.html(_.join(['Hello', 'webpack'], ' '));
    return element.get(0);
}

document.body.appendChild(component());