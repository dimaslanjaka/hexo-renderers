'use strict';

var parse_link_label = require('./parse_link_label.cjs');
var parse_link_destination = require('./parse_link_destination.cjs');
var parse_link_title = require('./parse_link_title.cjs');

// Just a shortcut for bulk export

exports.parseLinkLabel = parse_link_label;
exports.parseLinkDestination = parse_link_destination;
exports.parseLinkTitle = parse_link_title;
