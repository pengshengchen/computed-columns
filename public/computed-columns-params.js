import _ from 'lodash';
import uiModules from 'ui/modules';

const module = uiModules.get('kibana/computed-columns', ['kibana']);
module.controller('ComputedColumnsParamsVisController', ($scope, timefilter) => {
  $scope.totalAggregations = ['sum', 'avg', 'min', 'max', 'count'];
  $scope.$watchMulti(['vis.params.showPartialRows', 'vis.params.showMeticsAtAllLevels'], () => {
    if (!$scope.vis) {
      return;
    }

    const params = $scope.vis.params;
    if (params.showPartialRows || params.showMeticsAtAllLevels) {
      $scope.metricsAtAllLevels = true;
    } else {
      $scope.metricsAtAllLevels = false;
    }
  });

  $scope.addComputedColumn = (computedColumns) => {
     timefilter.getBounds().min_d;
    computedColumns.push({
      formula: 'col[0] * col[0]',
      label: 'Value squared',
      format: '0,0',
      enabled: true ,
      min: timefilter.getBounds().min._d, // edited by pengshengchen
      max: timefilter.getBounds().max._d, // edited by pengshengchen
      enableDivideByTimeRange: false // edited by pengshengchen
    });
  };

  $scope.removeComputedColumn = (output, computedColumns) => {
    if (computedColumns.length === 1) {
      return;
    }
    const index = computedColumns.indexOf(output);
    if (index >= 0) {
      computedColumns.splice(index, 1);
    }

    if (computedColumns.length === 1) {
      computedColumns[0].enabled = true;
    }
  };
});
