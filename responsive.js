function responsivesize() {
      w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
      h = (document.documentElement.scrollHeight || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
            prefw = 1800;
            prefh = 874+document.getElementById('tophead').offsetHeight;
            document.body.style.zoom = Math.min(w/prefw,h/prefh);
        }