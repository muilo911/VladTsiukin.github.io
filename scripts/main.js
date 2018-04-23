/* main.js */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  let max_particles = 1000;

  var cns = document.createElement('canvas');
  var raysBody = document.getElementById("js-rays-body");
  cns.width = $(raysBody).width();
  cns.height = $(raysBody).height();
  $(".js-rays").append(cns);

  var canvas = cns.getContext('2d');

  class Particle {
      constructor(canvas, progress) {
          let random = Math.random();
          this.progress = 0;
          this.canvas = canvas;

          this.x = ($(raysBody).width()) + (Math.random() * 300 - Math.random() * 300);
          this.y = ($(raysBody).height()) + (Math.random() * 300 - Math.random() * 300);
          this.s = Math.random() * 1;
          this.a = 0;
          this.w = $(raysBody).width();
          this.h = $(raysBody).height();
          this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
          this.color = random > .2 ? "#fdff52" : "#feffac";
          this.radius = random > .8 ? Math.random() * 2 : this.radius;
          this.color = random > .8 ? "#feffac" : this.color;

          // this.color  = random > .1 ? "#ffae00" : "#f0ff00" // rays
          this.variantx1 = Math.random() * 300;
          this.variantx2 = Math.random() * 400;
          this.varianty1 = Math.random() * 100;
          this.varianty2 = Math.random() * 120;
      }

      render() {
          this.canvas.beginPath();
          this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
          this.canvas.lineWidth = 2;
          this.canvas.fillStyle = this.color;
          this.canvas.fill();
          this.canvas.closePath();
      }

      move() {
          this.x += Math.cos(this.a) * this.s;
          this.y += Math.sin(this.a) * this.s;
          this.a += Math.random() * 0.8 - 0.4;

          if (this.x < 0 || this.x > this.w - this.radius) {
              return false;
          }

          if (this.y < 0 || this.y > this.h - this.radius) {
              return false;
          }
          this.render();
          this.progress++;
          return true;
      }
  }

  let particles = [];
  let init_num = popolate(max_particles);
  function popolate(num) {
      for (var i = 0; i < num; i++) {
          setTimeout(
              function () {
                  particles.push(new Particle(canvas, i));
              }.bind(this)
              , i * 20);
      }
      return particles.length;
  }

  function clear() {
      canvas.globalAlpha = 0.2;
      canvas.fillStyle = "#0f0618";
      canvas.fillRect(0, 0, cns.width, cns.height);
      canvas.globalAlpha = 1;
  }

  function update() {
      particles = particles.filter(function (p) {
          return p.move();
      });
      if (particles.length < init_num) {
          popolate(1);
      }
      clear();
      requestAnimationFrame(update.bind(this));
  }
  update();

});
