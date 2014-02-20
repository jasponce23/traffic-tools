var mbUrl = 'http://{s}.tiles.mapbox.com/v3/conveyal.map-jc4m5i21/{z}/{x}/{y}.png';

var cLayers = new Array();

var overlays = new L.LayerGroup();

var newMarker = null;

var murderIcon = L.icon({
	iconUrl: '/public/images/alert_icons/murder.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var homicideIcon = L.icon({
	iconUrl: '/public/images/alert_icons/homicide.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var parricideIcon = L.icon({
	iconUrl: '/public/images/alert_icons/parricide.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var physicalinjuriesIcon = L.icon({
	iconUrl: '/public/images/alert_icons/Physicalinjuries.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var kidnappingIcon = L.icon({
	iconUrl: '/public/images/alert_icons/kidnapping.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var robberyIcon = L.icon({
	iconUrl: '/public/images/alert_icons/robbery.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var theftIcon = L.icon({
	iconUrl: '/public/images/alert_icons/theft.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var rapeIcon = L.icon({
	iconUrl: '/public/images/alert_icons/rape.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});

var firearmsIcon = L.icon({
	iconUrl: '/public/images/alert_icons/firearms.png',
	iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});


var explosivesIcon = L.icon({
	iconUrl: '/public/images/alert_icons/explosives.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});
var carnappingIcon = L.icon({
	iconUrl: '/public/images/alert_icons/carnapping.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});
var drugsIcon = L.icon({
	iconUrl: '/public/images/alert_icons/drugs.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});
var othersIcon = L.icon({
	iconUrl: '/public/images/alert_icons/others.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37]
});


var mbAttrib = 'Powered by ITMS &copy; Mapbox (terms).';
//var mbAttrib = 'Traffic overlay powered by OpenPlans Vehicle Tracking Tools, Map tiles &copy; Mapbox (terms).';
var mbOptions = {
  maxZoom : 17,
  attribution : mbAttrib
};

// dynamic height management

$(document).ready(sizeContent);
$(window).resize(sizeContent);

function sizeContent() {
  var newHeight = $(window).height() - $("#header").height() + "px";
  $("#map").css("height", newHeight);
}
	
var incidentLayer = new L.LayerGroup();
var indcidentData = new Array();
var incidentMarkers = {}

var active = true;

function setFilterToggle(toggleState)
{
	active = toggleState;
	loadIncidents();
}

function loadIncidents()
{
	
	$.get('/citom/alerts', {active: active, type: $('#incidentType').val(), filter: $('#filter').val(), fromDate: $('#datepicker1').val(), toDate: $('#datepicker2').val()}, function(data){
		indcidentData = data;
		
		updateIncidents();
	});
}

function markerClick(mEvent)
{
	loadMessages(mEvent.target.alertData.id);
}

function loadMessages(alertId)
{
	//var alertId = mEvent.target.alertData.id;


	$.get('/citom/alertMessages', {id: alertId} , function(data){

		incidentMarkers[alertId].alertData.messages = data;
		
		var html = ich.incident(incidentMarkers[alertId].alertData, true);

		incidentMarkers[alertId].bindPopup(html);
		incidentMarkers[alertId].openPopup();

	});
}


function saveMessage(alertId)
{
	//var alertId = mEvent.target.alertData.id;

	var messageData = $('#message' + alertId).val(); 
	
	if(messageData == "")
		return;
	
	$.post('/citom/saveAlertMessage', {id: alertId,  message: messageData} , function(data){

		loadMessages(alertId);
		
	});
}


function clearAlert(alertId)
{
	//var alertId = mEvent.target.alertData.id;

	var messageData = $('#message' + alertId).val(); 
	
	$.post('/citom/clearAlert', {id: alertId} , function(data){

		loadIncidents();
		
	});
}

function updateIncidents()
{
	incidentLayer.clearLayers();
	incidentMarkers = {}
	
	for(var incident in indcidentData)
	{
		var icon = null;

		
		if(indcidentData[incident].type == "Murder")
			icon = murderIcon;
		else if(indcidentData[incident].type == "Homicide")
			icon = homicideIcon;
		else if(indcidentData[incident].type == "Parricide")
			icon = parricideIcon;
		else if(indcidentData[incident].type == "Physicalinjuries")
			icon = physicalinjuriesIcon;
		else if(indcidentData[incident].type == "Kidnapping")
			icon = kidnappingIcon;
		else if(indcidentData[incident].type == "Robbery")
			icon = robberyIcon;
		else if(indcidentData[incident].type == "Theft")
			icon = theftIcon;
		else if(indcidentData[incident].type == "Rape")
			icon = rapeIcon;
		else if(indcidentData[incident].type == "Firearms")
			icon = firearmsIcon;
		else if(indcidentData[incident].type == "Explosives")
			icon = explosivesIcon;
		else if(indcidentData[incident].type == "Carnapping")
			icon = carnappingIcon;
		else if(indcidentData[incident].type == "Drugs")
			icon = drugsIcon;
		else if(indcidentData[incident].type == "Others")
			icon = othersIcon;
		else
			continue;
		
		incidentMarkers[indcidentData[incident].id] = new L.marker([indcidentData[incident].location_lat.toFixed(5), indcidentData[incident].location_lon.toFixed(5)], {icon: icon});
		
		indcidentData[incident].messages = [];
		var data = ich.incident(indcidentData[incident], true);
		
		incidentMarkers[indcidentData[incident].id].alertData = indcidentData[incident]
		
		incidentMarkers[indcidentData[incident].id].bindPopup(data);
		
		incidentMarkers[indcidentData[incident].id].addTo(incidentLayer);
		
		incidentMarkers[indcidentData[incident].id].on('click', markerClick);
	}
}




function mapClick(mEvent)
{
	cancelMarker();
	
	if(newMarker == null)
	{
		newMarker = L.marker(mEvent.latlng);
		newMarker.addTo(map);
	
		var data = ich.incidentSave(null, true);
		
		newMarker.bindPopup(data);
		newMarker.openPopup();	
	}
}

function saveMarker()
{
	if(newMarker != null)
	{
		var incidentType = $('#newIncidentType').val();
		var incidentMessage = $('#newIncidentDescription').val();
		
		$.post('/citom/saveIncident', {lat: newMarker.getLatLng().lat, lng: newMarker.getLatLng().lng, message: incidentMessage, type: incidentType} , function(data){

			loadIncidents();
			
		});
	}
	map.removeLayer(newMarker);
	newMarker = null;
}

function cancelMarker()
{
	if(newMarker != null)
	{
		map.removeLayer(newMarker);
	}
	
	newMarker = null;
}

function updateFilter()
{
	if($('#filter').val() == 'custom')
	{
		$('#customCompare').show();
	}
	else
		$('#customCompare').hide();
	
	loadIncidents();
}

var overlayUrl = 'http://cebutraffic.org/tiles_avg/{z}/{x}/{y}.png';
var overlay = null;

function currentConditions()
{
	if($('#currentConditions').is(':checked'))
		overlay.addTo(map);
	else
		map.removeLayer(overlay);


}


$(document).ready(function() {
	
	overlay = L.tileLayer(overlayUrl, mbOptions);
	
	$('#showActive').button('toggle');
	
	$('#customCompare').hide();
	$('#datepicker1').datepicker();
	$('#datepicker2').datepicker();
	
	
	map = new L.map('map').setView(defaultLatLon, 13);

	L.tileLayer(mbUrl, mbOptions).addTo(map);
	
	incidentLayer.addTo(map);

	map.on('contextmenu', mapClick);
	
	loadIncidents();
	
	$('#downloadReport').click(function(e) {
	    e.preventDefault();  //stop the browser from following
	    window.location.href = '/citom/alertsCsv?active=' + active + '&type=' + $('#incidentType').val() + '&filter=' + $('#filter').val() + '&fromDate=' + $('#datepicker1').val() + '&toDate=' + $('#datepicker2').val();
	});
 
});


