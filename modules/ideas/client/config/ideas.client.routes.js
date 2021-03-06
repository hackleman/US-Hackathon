'use strict';

angular.module('ideas').config(['$stateProvider',
  function ($stateProvider) {

    $stateProvider
      .state('ideas', {
        abstract: true,
        url: '/ideas',
        template: '<ui-view/>'
      })
      .state('ideas.list', {
        url:'',
        templateUrl: 'modules/ideas/client/views/list-ideas.client.view.html'
      })
      .state('ideas.create', {
        url:'/create',
        templateUrl: 'modules/ideas/client/views/create-idea.client.view.html',
      })
      .state('ideas.success', {
        url:'/success',
        templateUrl: 'modules/ideas/client/views/success.client.view.html',
      })
      .state('ideas.edit', {
        url:'/:ideaId/edit',
        templateUrl: 'modules/ideas/client/views/edit-idea.client.view.html',
      })
      .state('ideas.view', {
        url:'/:ideaId',
        templateUrl: 'modules/ideas/client/views/view-idea.client.view.html',
      });
  }
]);
