'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	$.get("/project/"+idNumber, processProject);
	console.log("User clicked on project " + idNumber);
}

function processProject(result){
	console.log(result);
	//Object {id: 5, title: "Skeleton and a Plan", date: "February 6", summary: "<p>Review the feedback you got last week from the …e, so make sure you will feel invested in it.</p>", image: "http://www.quality-wars.com/wp-content/uploads/Gantt-Chart-Example-2-NO-LETTERS1.jpg"}
	//image, small header with date, summary.
	var projectData = '<img src="'+result.image+'"class="detailsImage"><h3>'+result.date+'</h3>'+result.summary;
	$("#project"+result['id']+" .details").html(projectData);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	e.preventDefault();
	var colorsJson = $.get('/palette',processColors)
	console.log("User clicked on color button");
}

function processColors(result){
	var colors = result.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}