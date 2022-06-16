<h1 align="center">GenDiff</h1>

### Hexlet tests and linter status:

[![Actions Status](https://github.com/userao/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/userao/frontend-project-lvl2/actions)

[![Code tests and linter check](https://github.com/userao/frontend-project-lvl2/actions/workflows/tests-and-linter.yml/badge.svg)](https://github.com/userao/frontend-project-lvl2/actions/workflows/tests-and-linter.yml)

  

### Codeclimat badges

[![Maintainability](https://api.codeclimate.com/v1/badges/dcdbff3dc56a288499cf/maintainability)](https://codeclimate.com/github/userao/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/dcdbff3dc56a288499cf/test_coverage)](https://codeclimate.com/github/userao/frontend-project-lvl2/test_coverage)


<h2 align="center"> Description</h2>
Cli program, that compares two json/yaml files  and return difference.<br>
Can return data in three different formats: <ul><li>stylish;</li><li> plain;</li><li>json.</li></ul>

<h2 align="center">  DEMOs </h2>

* Comparison with stylish formatter: [![asciicast](https://asciinema.org/a/Nf4hWkeaS1xqMR7q039KzXvak.svg)](https://asciinema.org/a/Nf4hWkeaS1xqMR7q039KzXvak)

* Comparison with plain formatter: [![asciicast](https://asciinema.org/a/DgmB1W2V6vYbQ1icLhnm9u4u6.svg)](https://asciinema.org/a/DgmB1W2V6vYbQ1icLhnm9u4u6)

* Comparison with json formatter: [![asciicast](https://asciinema.org/a/hop6mKDKIcE4lyfpKoN0huYZq.svg)](https://asciinema.org/a/hop6mKDKIcE4lyfpKoN0huYZq)

<h2 align="center">Project setup</h2>
<ol>
	<li>Clone repository;</li>
	<li><code>npm install</code> project locally from cloned directory.</code>
</ol>

You can use this package as cli program by typing <code>gendiff [ --format [format type]] filepath1 filepath2</code> in bash, or by importing <code>genDiff</code> function in your modules.
