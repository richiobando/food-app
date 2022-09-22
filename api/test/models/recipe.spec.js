// var _a = require('../../src/db.js'), Recipe = _a.Recipe, conn = _a.conn;
// var expect = require('chai').expect;

const { Recipe, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Recipe model', function () {
    before(function () {
        return conn.authenticate()["catch"](function (err) {
            console.error('Unable to connect to the database:', err);
        });
    });
    describe('Validators', function () {
        beforeEach(function () { return Recipe.sync({ force: true }); });
        describe('ID', function () {
            it('should throw an error if Id is null', function (done) {
                Recipe.create({})
                    .then(function () { return done(new Error('It requires a valid name')); })["catch"](function () { return done(); });
            });
            it('should work when its a valid ID', function () {
                Recipe.create({ id: 2 });
            });
        });
        describe('title', function () {
            it('should throw an error if title is null', function (done) {
                Recipe.create({})
                    .then(function () { return done(new Error('It requires a valid title')); })["catch"](function () { return done(); });
            });
            it('should work when its a valid name', function () {
                Recipe.create({ title: 'Milanesa a la napolitana' });
            });
        });
        describe('Plate Summary', function () {
            it('should throw an error if Plate Summary is null', function (done) {
                Recipe.create({})
                    .then(function () { return done(new Error('It requires a valid summary')); })["catch"](function () { return done(); });
            });
            it('should work when its a valid xx', function () {
                Recipe.create({ summary: 'Milanesa a la napolitana' });
            });
        });
        describe('Step by step', function () {
            it('should work when its a valid xx', function () {
                Recipe.create({ steps: [] });
            });
        });
        describe('healthScore', function () {
            it('should work when its a valid healthScore', function () {
                Recipe.create({ healthScore: 77 });
            });
        });
        describe('Recipe', function () {
            it('should create Recipe when all data is valid', function () {
                Recipe.create({
                    id: 1,
                    title: 'Gallo Pinto',
                    summary: 'arroz con frijoles ',
                    steps: [],
                    healthScore: 100
                });
            });
        });
    });
});
