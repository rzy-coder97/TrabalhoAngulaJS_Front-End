(function () {
	"use strict";

	var gymApp = angular.module("gymApp");

	gymApp.controller("controlador", controlador);

	controlador.$inject = ["$scope", "$http"];

	function controlador($scope, $http) {
		var atualizar = document.querySelector("#atualizar");
		var enviar = document.querySelector("#enviar");
		var aviaozin = null;

		var vm = this;
		vm.HOST_HTTP = "http://localhost:3000";

		vm.aluno = {};
		vm.alunos = [];

		vm.init = function () {
			vm.listaAlunos();
		};

		vm.clear = function () {
			vm.aluno = {};
		};

		// GET
		vm.listaAlunos = function () {
			$http
				.get(vm.HOST_HTTP + "/users/")
				.then(function (res) {
					vm.alunos = res.data.users;
				})
				.catch(function (err) {
					console.log(err);
				});
		};

		// POST
		vm.cadastrarAluno = function () {
			$http
				.post(vm.HOST_HTTP + "/users/", vm.aluno)
				.then(function (res) {
					vm.alunos.push(angular.copy(vm.aluno));
					vm.clear();
				})
				.catch(function (err) {
					console.log(err);
					vm.clear();
				});
		};

		// PUT
		vm.carregarCadastro = function (indice, aluno) {
			atualizar.classList.toggle("hidden");
			enviar.classList.toggle("hidden");

			aviaozin = vm.alunos[indice]._id;
		};

		vm.alterarCadastro = function (indice, aluno) {
			aluno = aviaozin;
			console.log(aluno);
			$http.put(vm.HOST_HTTP + "/users/" + aluno, vm.aluno).then(
				function (res) {
					console.log("Funfando");
					vm.clear();
					vm.listaAlunos();
					atualizar.classList.toggle("hidden");
					enviar.classList.toggle("hidden");
				},
				function (err) {
					console.log(err);
				}
			);
		};

		// DELETE
		vm.deletarCadastro = function (indice, aluno) {
			aluno = vm.alunos[indice]._id;
			console.log(aluno);
			$http.delete(vm.HOST_HTTP + "/users/" + aluno, vm.aluno).then(
				function (res) {
					vm.clear();
					vm.listaAlunos();
				},
				function (err) {
					console.log(err);
				}
			);
		};
	}
})();
