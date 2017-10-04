var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";
var PRODUCT_VERSION_CHANNEL = "product-version";
var COMPONENT_CHANNEL = "component";
var ISSUETYPE_CHANNEL = "issue-type";
var SEVERITY_CHANNEL = "severity";

var PRODUCT_STATE_CHANNEL = "product-state";
var COMPONENT_STATE_CHANNEL = "component-state";
var ISSUETYPE_STATE_CHANNEL = "issuetype-state";
var SEVERITY_STATE_CHANNEL = "severity-state";

var ISSUESDATA_CHANNEL = "issues-data";

var currentProduct;
var currentProductVersion;
var currentComponent;
var currentIssueType;
var currentSeverity;

var currentState;

var currentSeriesData;

var currentChartTitle;

var currentTrendDummyData;

gadgets.HubSettings.onConnect = function () {
    gadgets.Hub.subscribe(PRODUCT_STATE_CHANNEL, function(topic, message) {
        if (message){
            currentState = message;
            callbackForStateChannel(message);
        }
    });
    gadgets.Hub.subscribe(COMPONENT_STATE_CHANNEL, function(topic, message) {
        if (message){
            currentState = message;
            callbackForStateChannel(message);
        }
    });
    gadgets.Hub.subscribe(SEVERITY_STATE_CHANNEL, function(topic, message) {
        if (message){
            currentState = message;
            callbackForStateChannel(message);
        }
    });
    // Subscribe to the product channel
    gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message){
        if(message){
            currentProduct = message;
        }
    });
    //Subscribe to the product version channel
    gadgets.Hub.subscribe(PRODUCT_VERSION_CHANNEL, function(topic, message){
        if(message){
            currentProductVersion = message;
        }
    })
    // Subscribe to the severity channel.
    gadgets.Hub.subscribe(COMPONENT_CHANNEL, function (topic, message) {
        //callbackForChannels(message);
        if(message){
            currentComponent = message;
        }
    });
    //Subscribe to the issuetype channel
    gadgets.Hub.subscribe(SEVERITY_CHANNEL, function (topic, message) {
        //callbackForChannels(message);
        if (message){
            currentSeverity = message;
        }
    });
    gadgets.Hub.subscribe(ISSUESDATA_CHANNEL, function(topic, message){
        if(message){
            initChart(message);
        }
    });
    //Subscribe to the issuetype channel
    gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
        //callbackForChannels(message);
        if(message){
            currentIssueType = message;
        }
    });
    //Subscribe to the issuetype channel
    gadgets.Hub.subscribe(ISSUETYPE_STATE_CHANNEL, function (topic, message) {
        //callbackForChannels(message);
        if(message){
            currentIssueType = message;
            callbackForStateChannel(message);
        }
    });
};

function initChart(){
    debugger;
    // this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = responseData;
    currentState = '0';
    callbackForStateChannel(currentState);
}

function callbackForDummy(startDate) {

    switch(startDate){
        case '2017-09-15':
            currentTrendDummyData = last7Days;
            createTrendChart();
            break;

        case '2017-08-23':
            currentTrendDummyData = last30Days;
            createTrendChart();
            break;

        case '2017-09-01':
            currentTrendDummyData = thisMonth;
            createTrendChart();
            break;

        case '2017-08-01':
            currentTrendDummyData = lastMonth;
            createTrendChart();
            break
    }
}
function callbackForDummyMonthly() {
    currentTrendDummyData = monthly;
    createTrendChart();
}
function callbackForDummyQuarterly() {
    currentTrendDummyData = quarterly;
    createTrendChart();
}
function callbackForDummyYearly() {
    currentTrendDummyData = yearly;
    createTrendChart();
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
            currentTrendDummyData = last30Days;
            createTrendChart();
            break;
        case '1':
            break;
        case '5':
            break;
        case '12':
            break;
        case '13':
            break;
        case '15':
            break;
        case '51':
            break;
        case '125':
            break;
        case '135':
            break;
        case '512':
            break;
        case '513':
            break;

    }
}

function getIssueHistoryData(category, dateFrom, dateTo) {
    var issuesForProducts = [];
    var path;
    if (category === 'Area'){
        path = "getAreaLevelIssues";
    }else if(category === 'Product '){
        path = "getProductLevelIssues";
    }else if(category === 'ProductVersion '){
        path = "getProductVersionLevelIssues";
    }else if(category === 'Component'){
        path = "getComponentLevelIssues";
    }

    $.ajax({
        type: "GET",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer 6831161b-0fe8-33cb-b4cb-df38e9acf924");
        },
        url: 'https://10.100.4.110:8246/internal/product-quality/v1.0/jira/test',
        data:{
            dateFrom : dateFrom,
            dateTo : dateTo
        },
        async: false,
        success: function(data){
            issuesForProducts = data;
        }
    });
    console.log(issuesForProducts);
}


function getDummyHistoryData(dateFrom, dateTo) {
    var issuesForProducts = [];
}


function createTrendChart(){

    Highcharts.chart('trend-chart-container', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },

        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of Issues'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            enabled: false
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },
        series: [currentTrendDummyData]

    });
}



var last7Days = {
    name: "WSO2 Identity Server",
    data: [
        {name:"2017-08-11",y:581},
        {name:"2017-08-12",y:621},
        {name:"2017-08-13",y:674},
        {name:"2017-08-14",y:674},
        {name:"2017-08-15",y:674},
        {name:"2017-08-16",y:678},
        {name:"2017-08-17",y:680}

    ]
};

var lastMonth = {
    name: "WSO2 Identity Server",
    data: [
        {name:"2017-08-01",y:612},
        {name:"2017-08-02",y:612},
        {name:"2017-08-03",y:612},
        {name:"2017-08-04",y:612},
        {name:"2017-08-05",y:612},
        {name:"2017-08-06",y:612},
        {name:"2017-08-07",y:612},
        {name:"2017-08-08",y:612},
        {name:"2017-08-09",y:590},
        {name:"2017-08-10",y:590},
        {name:"2017-08-11",y:590},
        {name:"2017-08-12",y:612},
        {name:"2017-08-13",y:614},
        {name:"2017-08-14",y:614},
        {name:"2017-08-15",y:614},
        {name:"2017-08-16",y:614},
        {name:"2017-08-17",y:614},
        {name:"2017-08-18",y:607},
        {name:"2017-08-19",y:607},
        {name:"2017-08-20",y:607},
        {name:"2017-08-21",y:608},
        {name:"2017-08-22",y:581},
        {name:"2017-08-23",y:581},
        {name:"2017-08-24",y:581},
        {name:"2017-08-25",y:621},
        {name:"2017-08-26",y:674},
        {name:"2017-08-27",y:674},
        {name:"2017-08-28",y:674},
        {name:"2017-08-29",y:678},
        {name:"2017-08-30",y:680}

    ]
};

var thisMonth = {
    name: "WSO2 Identity Server",
    data: [
        {name:"2017-09-01",y:612},
        {name:"2017-09-02",y:612},
        {name:"2017-09-03",y:612},
        {name:"2017-09-04",y:612},
        {name:"2017-09-05",y:612},
        {name:"2017-09-06",y:612},
        {name:"2017-09-07",y:612},
        {name:"2017-09-08",y:612},
        {name:"2017-09-09",y:590},
        {name:"2017-09-10",y:590},
        {name:"2017-09-11",y:590},
        {name:"2017-09-12",y:612},
        {name:"2017-09-13",y:614},
        {name:"2017-09-14",y:614},
        {name:"2017-09-15",y:614},
        {name:"2017-09-16",y:614},
        {name:"2017-09-17",y:614},
        {name:"2017-09-18",y:607},
        {name:"2017-09-19",y:607},
        {name:"2017-09-20",y:607},
        {name:"2017-09-21",y:608},
        {name:"2017-09-22",y:581}

    ]
};

var last30Days = {
    name: "WSO2 Identity Server",
    data: [
        {name:"2017-08-23",y:581},
        {name:"2017-08-24",y:581},
        {name:"2017-08-25",y:621},
        {name:"2017-08-26",y:674},
        {name:"2017-08-27",y:674},
        {name:"2017-08-28",y:674},
        {name:"2017-08-29",y:678},
        {name:"2017-08-30",y:680},
        {name:"2017-09-01",y:612},
        {name:"2017-09-02",y:612},
        {name:"2017-09-03",y:612},
        {name:"2017-09-04",y:612},
        {name:"2017-09-05",y:612},
        {name:"2017-09-06",y:612},
        {name:"2017-09-07",y:612},
        {name:"2017-09-08",y:612},
        {name:"2017-09-09",y:590},
        {name:"2017-09-10",y:590},
        {name:"2017-09-11",y:590},
        {name:"2017-09-12",y:612},
        {name:"2017-09-13",y:614},
        {name:"2017-09-14",y:614},
        {name:"2017-09-15",y:614},
        {name:"2017-09-16",y:614},
        {name:"2017-09-17",y:614},
        {name:"2017-09-18",y:607},
        {name:"2017-09-19",y:607},
        {name:"2017-09-20",y:607},
        {name:"2017-09-21",y:608},
        {name:"2017-09-22",y:581}

    ]
};

var yearly = {
    name: "WSO2 Identity Server",
    data: [
        {name:"2015",y:674},
        {name:"2016",y:678},
        {name:"2017",y:680}
    ]
};

var quarterly = {
    name: "WSO2 Identity Server",
    data: [
        {name:"Q1",y:674},
        {name:"Q2",y:674},
        {name:"Q3",y:674},
        {name:"Q4",y:678}
    ]
};

var monthly = {
    name: "WSO2 Identity Server",
    data: [
        {name:"Jan",y:674},
        {name:"Feb",y:674},
        {name:"Mar",y:674},
        {name:"Apr",y:678},
        {name:"May",y:680},
        {name:"June",y:674},
        {name:"July",y:674},
        {name:"Aug",y:674},
        {name:"Sep",y:674},
        {name:"Oct",y:678},
        {name:"Nov",y:680},
        {name:"Dec",y:674}
    ]
};
