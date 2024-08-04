---
description: Easy JavaScript based charts in any web application
---

# Overview

{% hint style="info" %}
ChartSQL.js is currently in development. Documentation is for feedback purposes.
{% endhint %}

ChartSQL.js is an open source library to chart SQL (or any table like data) seamlessly within any web application.

We have designed ChartSQL.js to be the easiest to use JavaScript charting library available.

#### Key Benefits

* Simple .js integration
* Supports any SQL table-like or NoSQL source of data
* Full rendering control with intuitive @directives
* What You Query is What You Chart (Whikee-Whic) - Simple and declarative charting.

## Minimal Example

The following is all that is required to create a basic column chart

{% tabs %}
{% tab title="Code" %}
```javascript
// Sample data, typically retrieved from an executed SQL query or API call
var data = [
  {category: 'shoes', total_sales: 5000},
  {category: 'pants', total_sales: 10000},
  {category: 'shirts', total_sales: 8000},
  {category: 'socks', total_sales: 4000}
];

// Render the data into a chart
chartsql.createChart({
  // Target HTML element id to place the chart, or one
  // will be created and appended to the body
  target: 'auto-column',
  // The data for the chart
  data: data
});
```
{% endtab %}

{% tab title="Chart" %}
<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption><p>An example auto generating column chart</p></figcaption></figure>
{% endtab %}
{% endtabs %}

## Quick Start

1. Add `chartsql.js` to Your Project and setup a basic column chart

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="../chartsql.js"></script>
</head>
<body>

  <!-- Container for Chart -->
  <div id="my-chart"></div>

  <script>
    // Sample data, typically retrieved from executing the SQL query,
    // but chart data can be from any source.
    var data = [
	{category: 'shoes', total_sales: 5000},
	{category: 'pants', total_sales: 10000},
	{category: 'shirts', total_sales: 8000},
	{category: 'socks', total_sales: 4000}
    ]

    // Create and render the chart
    chartsql.createChart({
      target: 'my-chart',
      data: data
    });
  </script>
</body>
</html>
```

## createChart({})&#x20;

`createChart()` allows you to render data into chart visuals at the target HTML element

The typical flow is:

* Setup ChartSQL
* Fetch data
* call `createChart()` to render the data into a chart.

### Parameters

<table><thead><tr><th>Parameter</th><th width="202">Required?</th><th>Description</th></tr></thead><tbody><tr><td>target</td><td>no</td><td>The DOM element ID where the chart will be rendered.</td></tr><tr><td>data</td><td>yes</td><td>An object containing the data to be used for rendering the chart. See <a href="overview.md#working-with-data">Working with Data</a></td></tr><tr><td>directives</td><td>yes</td><td>SQL string containing directives, or object of directives.</td></tr></tbody></table>

## Auto Charts

ChartSQL.js will try to automatically choose a basic chart type depending on the fields in your data.

The auto charts helps you quickly visualize and explore data and then you can [Customize Charts](overview.md#customizing-charts) for more control.

* [Auto Column](overview.md#auto-column-chart)
* [Auto Grouped Column](overview.md#auto-grouped-column-chart)
* [Auto Date Line](overview.md#auto-date-line-chart)

### Auto Column Chart

When there is one string and one numeric field in the data

```javascript
{category: 'shoes', total_sales: 5000}
```

{% tabs %}
{% tab title="Chart" %}
<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```javascript
// Sample data, typically retrieved from an executed SQL query or API call
var data = [
  {category: 'shoes', total_sales: 5000},
  {category: 'pants', total_sales: 10000},
  {category: 'shirts', total_sales: 8000},
  {category: 'socks', total_sales: 4000}
];

// Render the data into a chart
chartsql.createChart({
  // Target HTML element id to place the chart, or one
  // will be created and appended to the body
  target: 'auto-column',
  // The data for the chart
  data: data
});
```
{% endtab %}
{% endtabs %}

### Auto Grouped Column Chart

When there is one string and 2 or more numeric fields the numeric fields will be grouped

```javascript
{category: 'shoes', total_sales: 5000, total_profit: 2000}
```

{% tabs %}
{% tab title="Chart" %}
<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}


```javascript
var data = {
	columns: ['category', 'total_sales', 'total_profit'],
	rows: [
		['shoes', 5000, 2000],
		['pants', 10000, 4000],
		['shirts', 8000, 3000],
		['socks', 4000, 1000]
	]
}

chartsql.createChart({
	target: 'auto-grouped-column',
	data: data,
	directives: {
	}
});
```
{% endtab %}
{% endtabs %}

### Auto Date Line Chart

When there is a date field and a numeric field

```javascript
{month: '2022-01-01', total_sales: 5000}
```

{% tabs %}
{% tab title="Chart" %}
<figure><img src="../../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```javascript
// Sample data, typically retrieved from an executed SQL query
var data = [
	{month: '2022-01-01', total_sales: 5000},
	{month: '2022-02-01', total_sales: 7000},
	{month: '2022-03-01', total_sales: 4900},
	{month: '2022-04-01', total_sales: 7528},
	{month: '2022-05-01', total_sales: 7762},
	{month: '2022-06-01', total_sales: 8000},
	{month: '2022-07-01', total_sales: 9500},
	{month: '2022-08-01', total_sales: 8250},
	{month: '2022-09-01', total_sales: 9000},
	{month: '2022-10-01', total_sales: 8500},
	{month: '2022-11-01', total_sales: 9500},
	{month: '2022-12-01', total_sales: 10000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'auto-dateline',
	data: data
});
```
{% endtab %}
{% endtabs %}

## Customizing Charts

You can specify exactly how to render the chart with directives (aka @directives).&#x20;

Directives allow you to fully control the type of chart and the selection of the categories, series formats and other ChartSQL.js features.

### Basic Directives Example

`createChart()` takes a 'directives' object which contains the directives for controlling rendering of the chart.

{% tabs %}
{% tab title="Code" %}
```javascript
// Sample data, typically retrieved from an executed SQL query
var data = [
	{category: 'shoes', total_sales: 5000},
	{category: 'pants', total_sales: 10000},
	{category: 'shirts', total_sales: 8000},
	{category: 'socks', total_sales: 4000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-bar',
	data: data,
	directives: {
		chart: 'bar'
	}
});
```
{% endtab %}

{% tab title="Chart" %}
<figure><img src="../../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

### Common Directives

* chart - The type of chart: bar, column, line etc
* category - The column to use for the category (primary axis) of the chart
* series - The column/s to use for the data (secondary axis) of the chart
* formats - The data formats to render for the series

You can [See All Directives](../../../reference/directives/) for all the ways in which you can customize your charts.

{% hint style="info" %}
ChartSQL.js is currently in development and does not support all directives. See the [Supported Directives](overview.md#directives) section for current support
{% endhint %}

## Working with Data

ChartSQL.js is designed to work with table like data of columns and rows. Typically this data will come from executing a SQL query, but data from any source can be charted.

ChartSQL.js liberally accepts table data in a few different formats that you pass to the `createChart()` method.

### Array of Objects

```javascript
var data = [
	{ category: 'shoes', total_sales: 5000 },
	{ category: 'pants', total_sales: 10000 },
	{ category: 'shirts', total_sales: 8000 },
	{ category: 'socks', total_sales: 4000 }
];
```

### Array of Arrays

The first row in the array should be the column names

```javascript
var data = [
	['category', 'total_sales'],
	['shoes', 5000],
	['pants', 10000],
	['shirts', 8000],
	['socks', 4000]
];
```

### Table Object

```javascript
var data = {
	columns: ['category', 'total_sales'],
	rows: [
		['shoes', 5000],
		['pants', 10000],
		['shirts', 8000],
		['socks', 4000]
	]
};
```

### Data Class

If desired, you can instantiate your own instance of the Data.js class that ChartSQL creates internally.

```javascript
var data = new ChartSQLjs.Data({
	columns: ['category', 'total_sales'],
	rows: [
		['shoes', 5000],
		['pants', 10000],
		['shirts', 8000],
		['socks', 4000]
	]
});
```

## Relationship to ChartSQL Studio, Datasources, Dashboards & Extensions&#x20;

ChartSQL.js is the parsing and rendering layer. It does not handle managing and executing SQL against datasources, creating dashboards, or editing SQL Charts.

## Supported Features

ChartSQL.js is a subset of ChartSQL Studio and Dashboard Features. See the tables below of supported features

* ✔️ = fully supported
* ❌ = no support planned
* ☐   = support planned
* 〰️ = Partial support

### Auto Charts

List of [auto-charts.md](../../../reference/auto-charts.md "mention") charts that are currently supported

<table><thead><tr><th width="287">Auto Chart</th><th>ChartSQL.js</th><th>ChartSQL Studio</th></tr></thead><tbody><tr><td>Column</td><td>✔️</td><td>✔️</td></tr><tr><td>Grouped Column</td><td>☐</td><td>✔️</td></tr><tr><td>Date-based Line</td><td>☐</td><td>✔️</td></tr><tr><td>Datetime based line</td><td>☐</td><td>✔️</td></tr><tr><td>Stacked-Grouped Column</td><td>☐</td><td>✔️</td></tr><tr><td>Scatter</td><td>☐</td><td>✔️</td></tr><tr><td>Bubble (scatter with size)</td><td>☐</td><td>✔️</td></tr><tr><td>Heatmap</td><td>☐</td><td>✔️</td></tr></tbody></table>

### Chart Types

List of Chart Types that are currently supported

| Type    | ChartSQL.js | ChartSQL Studio |
| ------- | ----------- | --------------- |
| Area    | ☐           | ✔️              |
| Bar     | ☐           | ✔️              |
| Bubble  | ☐           | ✔️              |
| Column  | ☐           | ✔️              |
| Combo   | ☐           | ✔️              |
| Guage   | ☐           | ✔️              |
| Heatmap | ☐           | ✔️              |
| Line    | ☐           | ✔️              |
| Pie     | ☐           | ✔️              |
| Radar   | ☐           | ✔️              |
| Scatter | ☐           | ✔️              |

### Directives

<table><thead><tr><th>Directive</th><th width="127">ChartSQL.js</th><th width="181">ChartSQL Studio</th><th>Note</th></tr></thead><tbody><tr><td>@baselines</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@baseline-types</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@chart</td><td>✔️</td><td>✔️</td><td></td></tr><tr><td>@cateogry</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@formats</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@series</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@title</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@subtitle</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@groups</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@series-types</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@series-labels</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@stacking-mode</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@dash-id</td><td>❌</td><td>✔️</td><td>Only used for publishing to ChartSQL cloud. No use for ChartSQL.js</td></tr><tr><td>@overlay-series</td><td>☐</td><td>✔️</td><td></td></tr><tr><td>@tags</td><td>❌</td><td>✔️</td><td>Used for searching inside ChartSQL Studio and dashboards. Not used by ChartSQL.js</td></tr><tr><td>@mongodb-query</td><td>❌</td><td>✔️</td><td>Only used by ChartSQL Studio</td></tr></tbody></table>

### Other Capabilities

| Capability      | ChartSQL.js | ChartSQL Studio | Note                                                         |
| --------------- | ----------- | --------------- | ------------------------------------------------------------ |
| Series Assist   | ☐           | ✔️              | Assists when selecting series and no @series is defined      |
| Category Assist | ☐           | ✔️              | Assists in selecting categories when no @category is defined |
|                 |             |                 |                                                              |
