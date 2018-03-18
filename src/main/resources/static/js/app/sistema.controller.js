var sistemasApp = angular.module('sistemasApp', [ 'sistemasService','ngSanitize']);

sistemasApp.controller('sistemaController',
				function($scope, $location, $window, sistemasService) {
					
					$scope.filteredTodos = []
					  ,$scope.currentPage = 1
					  ,$scope.numPerPage = 50
					  ,$scope.maxSize = 10;
	
					$scope.listarTodos = function() {
						sistemasService.listar.query({}, {}, function(data) {
							$scope.sistemas = data;
						}, function(data) {
							console.log(data);
							alert('Erro ao listar sistemas');
						});
					};

					$scope.pesquisar = function() {
						if ($scope.emailPesquisa != ''
								&& $scope.emailPesquisa != ' '
								&& $scope.emailPesquisa != undefined
								&& $scope.emailPesquisa != null
								&& !$scope.validarEmail()) {
							alert("E-mail inválido.");
							
							return;
						}

						if (!$scope.emailPesquisa)
							$scope.emailPesquisa = ' ';
						if (!$scope.siglaPesquisa)
							$scope.siglaPesquisa = ' ';
						if (!$scope.descricaoPesquisa)
							$scope.descricaoPesquisa = ' ';

						sistemasService.pesquisar.query({
							descricaoPesquisa : $scope.descricaoPesquisa,
							siglaPesquisa : $scope.siglaPesquisa,
							emailPesquisa : $scope.emailPesquisa
						}, {}, function(data) {
							console.log('sistemas: ', data);
							
							$scope.sistemas = data;
							
							if(!$scope.sistemas || $scope.sistemas.length < 1) alert('Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!')
						}, function(data) {
							console.log(data);
							alert('Erro ao pesquisar sistemas');
						});
					};

					$scope.salvar = function() {
						if (!$scope.sistema.descricao || !$scope.sistema.sigla) {
							alert("Dados obrigatórios não informados.");

							return;
						} else if (!$scope.sistema.email
								|| !$scope.validarEmail()) {
							alert('E-mail inválido.');

							return;
						} else {
							if (!$scope.sistema.status) {
								$scope.sistema.status = 'ATIVO';
							}

							sistemasService.inserir.save({}, $scope.sistema,
									function(data) {
										alert('Operação realizada com sucesso.');
									}, function(data) {
										alert('Erro ao inserir sistema');
										console.log(data);
									});
						}
					};

					$scope.salvar = function() {
						if (!$scope.sistema.descricao || !$scope.sistema.sigla) {
							alert("Dados obrigatórios não informados. ");

							return;
						} else if (!$scope.sistema.email
								|| !$scope.validarEmail()) {
							alert('E-mail inválido.');

							return;
						} else {
							if (!$scope.sistema.status) {
								$scope.sistema.status = 'ATIVO';
							}

							sistemasService.inserir.save({}, $scope.sistema,
									function(data) {
										alert('Sistema inserido!');
									}, function(data) {
										alert('Operação realizada com sucesso.');
										console.log(data);
									});
						}
					};

					$scope.validarEmail = function() {
						var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

						if ($scope.sistema.email) {
							console.log('email', $scope.sistema.email);
							return re.test($scope.sistema.email);
						}

						if ($scope.emailPesquisa) {
							console.log('emailPesquisa', $scope.emailPesquisa);
							return re.test($scope.emailPesquisa);
						}
					};
					
					$scope.getBySigla = function(sigla) {
						sistemasService.sistemaSigla.get({sigla : $scope.siglaAlterar}, {}, 
							function(data) {
								$scope.sistema = data;
								
								console.log(data);
							}, function(data) {
								alert('Erro ao consultar sistema');
								console.log(data);
						});
					};

					$scope.editarSistema = function(sigla) {
						$window.location.href = 'altera-sistema?sigla=' + sigla;
					};
					
					$scope.atualizar = function(sigla){
						if (!$scope.sistema.descricao || !$scope.sistema.sigla || !$scope.sistema.status || !$scope.sistema.novaAlteracao) {
							alert("Dados obrigatórios não informados.");

							return;
						} else if ($scope.sistema.email && !$scope.validarEmail()) {
							alert('E-mail inválido.');

							return;
						} else {
							if (!$scope.sistema.status) $scope.sistema.status = 'ATIVO';
							
							sistemasService.atualizar.update({sigla : sigla}, $scope.sistema, 
								function(data) {
									$scope.sistema = data;
									
									console.log(data);
									
									alert('Operação realizada com sucesso.');
								}, function(data) {
									alert('Erro ao atualizar sistema');
									console.log(data);
							});
						}
					};

					function getParameterByName(name, url) {
						if (!url)
							url = window.location.href;
						name = name.replace(/[\[\]]/g, "\\$&");
						var regex = new RegExp("[?&]" + name
								+ "(=([^&#]*)|&|#|$)"), results = regex
								.exec(url);
						if (!results)
							return null;
						if (!results[2])
							return '';
						return decodeURIComponent(results[2]
								.replace(/\+/g, " "));
					}

					$scope.init = function() {
						$scope.sistemas = [];

						$scope.sistema = {};

						$scope.descricaoPesquisa = '';
						$scope.siglaPesquisa = '';
						$scope.emailPesquisa = '';

						$scope.siglaAlterar = getParameterByName('sigla');

						if ($scope.siglaAlterar) {
							$scope.getBySigla();
						}
					};

					$scope.init();
					
					$scope.$watch('currentPage + numPerPage', function() {
					    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
					    , end = begin + $scope.numPerPage;
					    
					    $scope.filteredTodos = $scope.sistemas.slice(begin, end);
					});
				});

angular.bootstrap($('#sistemasApp'), [ 'sistemasApp' ]);