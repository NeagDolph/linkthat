var clipboard = new ClipboardJS('#main-title');
var url = "";

var e = document;
var a = e.getElementById("main-title");
var b = e.getElementsByClassName("toast-stack");
var c = "";
var d = "-remove";
var f = e.getElementById("url");
var g = e.getElementsByClassName("new");

a.addEventListener("click", function() {
	a.style.background = "#333"; 
	a.style.transition = "background 120ms";
	b[0].innerHTML += '<div class="toast-item -success">Copied to clipboard</div>';
	c = document.getElementsByClassName("toast-item");
	function aa() {
		c[0].classList.add(d);
		function ab() {
			c[0].parentElement.removeChild(c[0])
		}
		setTimeout(ab, 500)
	}
	setTimeout(aa, 2000);
	
	function ac() {
		a.style.background = "transparent"; 
		a.style.transition = "background 700ms";
	}
	setTimeout(ac, 120);
});

function ad() {
	var site;

	chrome.tabs.query({}, function(tabs) {
		sites = tabs.filter(obj => obj.active === true);
		site = sites[0]["url"];
		if (site.startsWith("chrome:") || site.startsWith("file:")) {
			b[0].innerHTML += '<div class="toast-item -error">Error with link</div>';
			c = document.getElementsByClassName("toast-item");
			function toastwait() {
				c[0].classList.add(d);
				function removewait() {
					c[0].parentNode.removeChild(c[0])
				}
				setTimeout(removewait, 500)
			}
			setTimeout(toastwait, 2000);
			
			add = ""
			
			if (site.length > 65) {
				add = "..."
			}
			
			f.innerHTML = site.substr(0, 65) + add;
		} else {
			create(site);
		}
	});
}

e.addEventListener('DOMContentLoaded', ad);

function create(link) {
	var request = new XMLHttpRequest();

	request.onload = function() {
		console.log("ran")
		if (request.status >= 200 && request.status < 400) {
			console.log("success");
			let data = request.responseText;
			let thedata = data.split("&--$%^&##D");
			let shortlink = "linkth.at/" + thedata[0]
			a.innerHTML = shortlink;
			a.setAttribute("data-clipboard-text", "https://" + shortlink);
			add = ""
			
			if (link.length > 65) {
				add = "..."
			}
			
			f.innerHTML = link.substr(0, 65) + add;
			url = thedata[2];
		} else {
			console.log(request.status);
			b[0].innerHTML += '<div class="toast-item -error">Internal Error</div>';
			c = document.getElementsByClassName("toast-item");
			function toastwait() {
				c[0].classList.add(d);
				function removewait() {
					c[0].parentNode.removeChild(c[0])
				}
				setTimeout(removewait, 500)
			}
			setTimeout(toastwait, 2000);
		}
	};

	request.onerror = function() {
		console.log("error");
		b[0].innerHTML += '<div class="toast-item -error">Connection Error</div>';
			c = document.getElementsByClassName("toast-item");
			function toastwait() {
				c[0].classList.add(d);
				function removewait() {
					c[0].parentNode.removeChild(c[0])
				}
				setTimeout(removewait, 500)
			}
			setTimeout(toastwait, 2000)
	};

	request.open('POST', "https://linkth.at/create", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("url=" + link);
}

function remove(code, make) {
	var request = new XMLHttpRequest();

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			if (make) {
				create(g.value);
			}
			g.value = "";
		}
	};

	request.open('POST', "https://linkth.at/delete", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("code=" + code);
}

document.getElementsByClassName("new")[0].onkeydown = function(event) {
    if (event.key === "Enter" && g.value != "") {
		g = e.getElementsByClassName("new")[0];
		if (g.value.startsWith("chrome:") || g.value.startsWith("file:")) {
			b[0].innerHTML += '<div class="toast-item -error">Error with link</div>';
			c = document.getElementsByClassName("toast-item");
			function toastwait() {
				c[0].classList.add(d);
				function removewait() {
					c[0].parentElement.removeChild(c[0]);
				}
				setTimeout(removewait, 500)
			}
			setTimeout(toastwait, 2000);
		} else {
			console.log("hi");
        	remove(url, true);
		}
    }
}

document.getElementsByClassName("remove")[0].addEventListener("click", function() {
	remove(url, false);
	a.innerHTML = "Successfully deleted!";
	f.innerHTML = "Click \"X\" to exit";
	a.removeAttribute("data-clipboard-text");
});

document.getElementsByClassName("exit")[0].addEventListener("click", function() {
	window.close();
});

e.getElementsByClassName("siteCont")[0].addEventListener("click", function() {
	var newURL = "https://linkth.at/";
	chrome.tabs.create({ url: newURL });
});
