( function ( ) {
	angular.module( 'angular-feedback', [ ] )
		.directive( 'feedbackWidget', [ '$http', '$window',
			function ( $http, $window ) {
				return {
					'restrict': 'E',
					'scope': {
						'url': '@',
						'successMessage': '@'
					},

					'link': function ( scope, element, attrs, controller ) {
						var window = angular.element( $window );
						var size = element.find( '.mod' )[ 0 ].clientWidth / 2;

						scope.feedback = {};
						scope.open = false;

						scope.submitFeedback = function ( ) {
							$http.post( scope.url, {
								'feedback': scope.feedback
							} );
						};

						scope.close = function ( ) {
							scope.feedback.comment = '';
							scope.open = false;
						};

						window.bind( 'resize', function ( ) {
							if ( scope.open ) {
								element.find( '.mod' )
									.css( 'left', window.outerWidth( ) / 2 - size + 'px' );
								scope.$apply( );
							}
						} );

						return scope.$watch( 'open', function ( newValue, oldValue ) {
							if ( newValue ) {
								element.find( '.mod' )
									.css( 'left', window.outerWidth( ) / 2 - size + 'px' );

								return element.find( 'textarea#feedbackInput' )
									.focus( );
							}
						} );
					},
					'template': "<div>" + "<div class='overlay' ng-show='open'></div>" + "<div class='mod' ng-show='open'>" + "<div class='modal-dialog'>" + "<div class='modal-content'>" + "<div class='modal-header'>" + "<button type='button' class='close' ng-click='close()'>&times;</button>" + "<h4 class='modal-title'>Feedback</h4>" + "</div>" + "<div class='modal-body'>" + "<form name='feedback' role='form' class='form-horizontal' ng-model='feedback.comment' ng-submit='submitFeedback()''>" + "<div class='form-group'>" + "<label class='control-label sr-only' for='feedbackInput'>Feedback</label>" + "<textarea id='feedbackInput' class='form-control' row='3' ng-model='feedback.comment' placeholder='Leave any feedback'>" + "</textarea>" + "</div>" + "</div>" + "<div class='modal-footer'>" + "<button class='btn btn-primary' type='submit'>Submit</button>" + "<button class='btn btn-default' type='button' ng-click='close()'>Cancel</button>" + "</div>" + "</form>" + "</div>" + "</div>" + "</div>" + "<button ng-click='open=!open;' class='feedback-launch btn btn-success'>Feedback</button>" + "</div>"
				};
			}
		] );
} )
	.call( this );
