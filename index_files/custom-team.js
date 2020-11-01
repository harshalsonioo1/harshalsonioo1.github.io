// ADDS _BLANK TO JOB POSTINGS
$(document).ready(function () {
  $("#BambooHR-ATS").mouseover(function () {
    $(".BambooHR-ATS-board a").attr("target", "_blank");
  });
});

// HR API
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/assets/altaml-bamboo.xml", /*"https://api.janalta.com/api/directory/",*/
    dataType: "xml",
    success: xmlParser
  });
});

// PARSER FOR HR API RESULT
function xmlParser(xml) {
  let vps = [];
  let normies = [];
  $(xml)
    .find("directory")
    .find("employees")
    .find("employee")
    .each(function (i, element) {
      let department = element.children.department.innerHTML;
      let title = element.children.jobTitle.innerHTML;
      let name = element.children.displayName.innerHTML;
      if (
        name.includes("Nicole") ||
        name.includes("Cory") ||
        name.includes("Euricelia") ||
        name.includes("Michael") ||
        name.includes("Mark") ||
        name.includes("Langager") ||
        name.includes("Brent") ||
        name.includes("Marcin") ||
        name.includes("O'Brien") ||
        name.includes("Lucas")
      ) {              
          vps.push(element);
      } else if (
        department.includes("Technology - Alta") ||
        department.includes("Data Science") ||
        department.includes("Finance") ||
        department.includes("Culture") ||
        department.includes("Development") || 
        department.includes("Product - Alta") || 
        department.includes("Project - Alta") || 
        department.includes("Marketing") || 
        department.includes("Research") || 
        department.includes("Management") || 
        name.includes("Koehn") 
      ) {
        if (
          !(
            name.includes("Juliano") || name.includes("Brenda")
          )
        ) {
          normies.push(element);
        }
      }
    });
    var ordering = {}
    let customSortOrder = ['Nicole', 'Cory', 'Euricelia', 'Michael', 'Mark', 'Chad', 'Brent', 'Marcin', 'Christopher', 'Lucas'];
    for (var i=0; i<customSortOrder.length; i++)
    {
        ordering[customSortOrder[i]] = i;
    }
    vps.sort( function(a, b) {
        return (ordering[a.children.firstName.innerHTML] - ordering[b.children.firstName.innerHTML]);
    });  
    appendVPList(vps);
    appendTeamList(normies);
}

// BUILDS HTML ELEMENTS FOR HR RESULT
function appendTeamList(elements) {
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    let name = element.children.displayName.innerHTML;
    if (element.children.preferredName.innerHTML) {
      name =
        element.children.preferredName.innerHTML +
        " " +
        element.children.lastName.innerHTML;
    }
    $("#teamlist").append(
      "<li class='col-sm-3 employee-item'><img src=" +
      element.children.photoUrl.innerHTML +
      " class='avatar avatar-sm'></img>" +
      "<h5 class='title'>" +
      name +
      "</h5>" +
      "<h6 class='subtitle'>" +
      element.children.jobTitle.innerHTML +
      "</h6></li>"
    );
  }
}

function appendVPList(elements) {
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    let name = element.children.displayName.innerHTML;
    if (element.children.preferredName.innerHTML) {
      name =
        element.children.preferredName.innerHTML +
        " " +
        element.children.lastName.innerHTML;
    }
    $("#vplist").append(
      "<li class='col-sm-3 employee-item'><img src=" +
      element.children.photoUrl.innerHTML +
      " class='avatar avatar-sm'></img>" +
      "<h5 class='title'>" +
      name +
      "</h5>" +
      "<h6 class='subtitle'>" +
      element.children.jobTitle.innerHTML +
      "</h6></li>"
    );
  }
}