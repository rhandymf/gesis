var sistemasService = angular.module('sistemasService', ['ngResource']);

sistemasService.factory('sistemasService', ['$resource', function($resource) {
	var factory = {};

	factory.listar = $resource('/api/sistemas', {}, {});
	factory.pesquisar = $resource('/api/sistemas-pesquisar/:descricaoPesquisa/:siglaPesquisa/:emailPesquisa', 
			{
				descricaoPesquisa: '@descricaoPesquisa',
				siglaPesquisa: '@siglaPesquisa',
				emailPesquisa: '@emailPesquisa'
			}, 
	{});
	factory.inserir = $resource('/api/sistemas/', {}, {});
	factory.sistemaSigla = $resource('/api/sistema-sigla/:sigla', {sigla : '@sigla'}, {});
	factory.atualizar = $resource('/api/sistema-altera/:sigla', {sigla : '@sigla'}, {update: {method: 'PUT'}});
	
	return factory;
}]);