var controleSistemaModule = angular.module('controleSistemaApp',
		[ 'ngAnimate' ]);

controleSistemaModule
		.controller(
				'controleSistemaController',
				function($scope, $http) {
					$scope.alterar = true;
					$scope.editar = false;
					$scope.statusLista = [ 'ATIVO', 'CANCELADO' ];

					$scope.filteredSistemas = [];
					$scope.currentPage = 1;
					$scope.numPerPage = 10;
					$scope.maxSize = 5;

					$http.defaults.headers.post["Content-Type"] = "application/json";

					function listarTodosSistemas() {
						$http({
							method : 'GET',
							url : '/sistemas'
						}).then(function(response) {
							var data = response.data;

							if (data._embedded != undefined) {
								$scope.sistemas = data._embedded.sistemas;
							} else {
								$scope.sistemas = [];
							}

							$scope.id = "";
							$scope.descricao = "";
							$scope.sigla = "";
							$scope.email = "";
							$scope.url = "";
							$scope.status = "";
							$scope.dataCadastro = "";
							$scope.dataUltimaAlteracao = "";
							$scope.dataNovaAlteracao = "";
							$scope.ultimaAlteracao = "";
							$scope.novaAlteracao = "";
							$scope.alterar = '!alterar';
						});
					}

					listarTodosSistemas();

					$scope.validarEmail = function() {
						var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

						return re.test($scope.email);
					};

					// add novo sistema
					$scope.addSistema = function addSistema() {
						$scope.alterar = true;
						$scope.editar = false;

						if ($scope.descricao == "" || $scope.sigla == ""
								|| $scope.status == "") {
							alert("Dados obrigatórios não informados.");
						} else if (!$scope.validarEmail()) {
							alert('E-mail inválido!');
						} else {
							var dataAtual = new Date();

							if (!$scope.status)
								$scope.status = 'ATIVO';

							$http.post('/sistemas', {
								id : $scope.id,
								descricao : $scope.descricao,
								sigla : $scope.sigla,
								email : $scope.email,
								url : $scope.url,
								status : $scope.status,
								dataUltimaAlteracao : dataAtual,
								ultimaAlteracao : $scope.novaAlteracao
							}).then(function(success) {
								alert("Operação realizada com sucesso.");

								listarTodosSistemas();
							});
						}
					};

					$scope.limparPesquisa = function() {
						$scope.siglaPesquisa = '';
						$scope.descricaoPesquisa = '';
						$scope.emailPesquisa = '';
					};

					$scope.alterarStatus = function(s) {
						var id = s._links.sistema.href
								.substr(s._links.sistema.href.lastIndexOf('/') + 1);

						if (s.status == 'ATIVO') {
							s.status = 'CANCELADO';
						} else if (s.status == 'CANCELADO') {
							s.status = 'ATIVO';
						}

						s["id"] = id;

						$http.post('/sistemas', s).then(function(success) {
							alert("Operação realizada com sucesso");

							listarTodosSistemas();
						});
					};

					$scope.editarSistema = function(s) {
						$scope.alterar = !$scope.alterar;
						$scope.editar = !$scope.editar;

						var id = s._links.sistema.href
								.substr(s._links.sistema.href.lastIndexOf('/') + 1);

						s["id"] = id;

						$scope.id = id;
								$scope.descricao = s.descricao,
								$scope.sigla = s.sigla,
								$scope.email = s.email,
								$scope.url = s.url,
								$scope.status = s.status,
								$scope.dataCadastro = s.dataCadastro,
								$scope.dataUltimaAlteracao = s.dataUltimaAlteracao,
								$scope.dataNovaAlteracao = new Date(),
								$scope.ultimaAlteracao = s.ultimaAlteracao,
								$scope.novaAlteracao = s.novaAlteracao
					};

					$scope.cancelarEdicao = function() {
						$scope.alterar = false;
						$scope.editar = false;

						$scope.id = "";
						$scope.descricao = "";
						$scope.sigla = "";
						$scope.email = "";
						$scope.url = "";
						$scope.status = "";
						$scope.dataCadastro = "";
						$scope.dataUltimaAlteracao = "";
						$scope.dataNovaAlteracao = "";
						$scope.ultimaAlteracao = "";
						$scope.novaAlteracao = "";
						$scope.alterar = '!alterar';
					};

					$scope.$watch("currentPage + numPerPage",
						function() {
							setTimeout(function(){
								var begin = (($scope.currentPage - 1) * $scope.numPerPage);
								
								var end = begin + $scope.numPerPage;
								
								if (!begin || !end) { 
									return; 
								} else {
									$scope.filteredSistemas = $scope.sistemas.slice(begin, end);
								}
							}, 1000);
					});
				});