function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'modules/skils/views/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}