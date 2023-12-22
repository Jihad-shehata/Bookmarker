// Global Selection
var siteName = document.getElementById("validationCustom01");
var SiteURL = document.getElementById("basic-url");
var btn_sub = document.getElementById("btn_sub");
var search = document.getElementById("searchInput");
// show stored products first if it's found or null
var sites;
var mainIndex = 0;
window.addEventListener("load", function () {
  if (this.localStorage.getItem("Sites") != null) {
    sites = JSON.parse(this.localStorage.getItem("Sites"));
    // to display them without perform submit fun
  } else {
    sites = [];
  }
  displaySites();
});
// Vlidation Functions
function validateSiteName(site_Name) {
  var siteNameRegEX = /^[A-Za-z_][A-Za-z_0-9]{1,39}$/;
  return siteNameRegEX.test(site_Name);
}
function validateURL(url) {
  var URL_RegEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return URL_RegEX.test(url);
}
// Submit Function
function addSite() {
  if (validateSiteName(siteName.value) && validateURL(SiteURL.value)) {
    //console.log("bravoo")
    var Site = {
      name: siteName.value,
      url: SiteURL.value,
    };
    if (btn_sub.innerHTML == "Submit") {
      sites.push(Site);
      Swal.fire({
        title: "Your Site added Successfully",
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
        },
      });

      btn_sub.innerHTML = "Submit";
    } else {
      sites.splice(mainIndex, 1, Site);
      Swal.fire({
        title: "Your Site has updated Successfully",
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
        },
      });
      btn_sub.innerHTML = "Submit";
    }
    displaySites();
    localStorage.setItem("Sites", JSON.stringify(sites));
    clearForm();
  }
}
// display Fun
function displaySites() {
  if (sites.length > 0) {
    document.getElementById("thead").innerHTML = ` <th >Index</th>
        <th>Website Name</th>
        <th>Visit Site</th>
        <th>Update </th>
        <th>Delete </th>
        `;
  } else {
    document.getElementById("thead").innerHTML =
      "There are no Sites to show .. Add Your First Site !";
  }
  var trs = "";
  for (var i = 0; i < sites.length; i++) {
    trs += ` <tr>
        <td>${i}</td>
        <td>${sites[i].name}</td>
        <td>
          <button onclick=""   class="add-btn btn_subb visit"><a href="${sites[i].url}" target="_blank"><i class="fa-solid fa-link"></i> Visit</a></button>
        </td>
        <td>
          <button onclick="update_Site(${i})"   class="btn_subb">Update</button>
        </td>
        <td>
          <button onclick="delete_product(${i})"  class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>`;
  }
  document.getElementById("tBody").innerHTML = trs;
}
// Fun to clear form inputs after user add his site to allow him to add another site
function clearForm() {
  siteName.value = "";
  SiteURL.value = "";
}
// Delete Product
function delete_product(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2 py-1",
      cancelButton: "btn btn-success mx-2 py-1",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      //   icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        //only with this line will delete product from products arr  but don't deleted fromm table
        sites.splice(index, 1);
        // any delete or add or update u must call display fun to show user the last version of his products
        displaySites();
        //u need to update the local storage with new arr without deleted items
        localStorage.setItem("Sites", JSON.stringify(sites));

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Site has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
// Update Site
function update_Site(index) {
  mainIndex = index;
  siteName.value = sites[index].name;
  SiteURL.value = sites[index].url;
  btn_sub.innerHTML = "Update Site";
}
function searchSite() {
  var searchTerm = search.value;
  var trs = "";

  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      //if there is matching
      trs += ` <tr>
        <td>${i}</td>
        <td>${sites[i].name}</td>
        <td>
          <button onclick=""   class="add-btn"><a href="${sites[i].url}" target="_blank">Visit</a></button>
        </td>
        <td>
          <button onclick="update_Site(${i})"   class="add-btn">Update</button>
        </td>
        <td>
          <button onclick="delete_product(${i})"  class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>`;
    }
    document.getElementById("tBody").innerHTML = trs;
  }
}
