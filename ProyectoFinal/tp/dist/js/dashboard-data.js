/*Dashboard Init*/
"use strict"; 
/*DataTable Init*/
if ($("#datable_1").length > 0) {
	/*Checkbox Add*/
	var tdCnt=0;
	$('table tr').each(function(){
		$('<span class="form-check mb-0"><input type="checkbox" class="form-check-input check-select" id="chk_sel_'+tdCnt+'"><label class="form-check-label" for="chk_sel_'+tdCnt+'"></label></span>').appendTo($(this).find("td:first-child"));
		tdCnt++;
	});
	var targetDt = $('#datable_1').DataTable({
		"dom": '<"row"<"col-7 mb-3"<"contact-toolbar-left">><"col-5 mb-3"<"contact-toolbar-right"f>>><"row"<"col-sm-12"t>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
		"ordering": true,
		"columnDefs": [ {
			"searchable": false,
			"orderable": false,
			"targets": [0,4,5,6]
		} ],
		"order": [1, 'asc' ],
		language: { search: "",
			searchPlaceholder: "Search",
			"info": "_START_ - _END_ of _TOTAL_",
			sLengthMenu: "View  _MENU_",
			paginate: {
			  next: '<i class="ri-arrow-right-s-line"></i>', // or '→'
			  previous: '<i class="ri-arrow-left-s-line"></i>' // or '←' 
			}
		},
		"drawCallback": function () {
			$('.dataTables_paginate > .pagination').addClass('custom-pagination pagination-simple pagination-sm');
		}
	});
	$(document).on( 'click', '.del-button', function () {
		targetDt.rows('.selected').remove().draw( false );
		return false;
	});
	$("div.contact-toolbar-left").html('<div class="d-xxl-flex d-none align-items-center"><div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example"><button type="button" class="btn btn-outline-light active">View all</button><button type="button" class="btn btn-outline-light">Monitored</button><button type="button" class="btn btn-outline-light">Unmonitored</button></div>');
	$("div.contact-toolbar-right").addClass('d-flex justify-content-end').append('	<button class="btn btn-sm btn-outline-light ms-3"><span><span class="icon"><i class="bi bi-filter"></i></span><span class="btn-text">Filters</span></span></button>');
	$("#datable_1").parent().addClass('table-responsive');
	
	/*Select all using checkbox*/
	var  DT1 = $('#datable_1').DataTable();
	$(".check-select-all").on( "click", function(e) {
		$('.check-select').attr('checked', true);
		if ($(this).is( ":checked" )) {
			DT1.rows().select();    
			$('.check-select').prop('checked', true);			
		} else {
			DT1.rows().deselect(); 
			$('.check-select').prop('checked', false);
		}
	});
	$(".check-select").on( "click", function(e) {
		if ($(this).is( ":checked" )) {
			$(this).closest('tr').addClass('selected');        
		} else {
			$(this).closest('tr').removeClass('selected');
			$('.check-select-all').prop('checked', false);
		}
	});
}

setTimeout(function(){
	/*Apex Column Chart*/
	window.Apex = {
		chart: {
			foreColor: "#646A71",
			fontFamily: 'Inter',
			toolbar: {
				tools: {
					download: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>',
					selection: '<img src="/static/icons/reset.png" width="20">',
					zoom: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
					zoomin: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
					zoomout: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
					pan: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>',
					reset: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
				}
			}
		},
		grid: {
			borderColor: '#F4F5F6',
		},
		xaxis: {
			labels: {
				style: {
					fontSize: '12px',
					fontFamily: 'inherit',
				},
			},
			axisBorder: {
				show: false,
			},
			title: {
				style: {
					fontSize: '12px',
					fontFamily: 'inherit',
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					fontSize: '12px',
					fontFamily: 'inherit',
				},
			},
			title: {
				style: {
					fontSize: '12px',
					fontFamily: 'inherit',
				}
			},
		},
	};
	/*Stacked Column*/
	var options1 = {
		series: [{
			name: 'PRODUCT A',
			data: [44, 55, 41, 67, 22, 43,44]
		}, {
			name: 'PRODUCT B',
			data: [13, 23, 20, 8, 13, 27,13]
		}],
		chart: {
			type: 'bar',
			height: 213,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
		},
		
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '45%',
				borderRadius: 5,
				
			},
		},
		xaxis: {
			type: 'datetime',
			categories: ['01/02/2021 GMT', '01/03/2021 GMT', '01/04/2021 GMT',
				'01/05/2021 GMT', '01/06/2021 GMT','01/07/2021 GMT', '01/08/2021 GMT'
			],
		},
		legend: {
			show:false
		},
		colors: ['#6172F3', '#fad0e7'],
		fill: {
			opacity: 1
		},
		dataLabels: {
			enabled: false,
		}
	};
	var chart1 = new ApexCharts(document.querySelector("#column_chart_2"), options1);
	chart1.render();

	/*Semi circle*/
	var options2 = {
		series: [80],
		chart: {
			type: 'radialBar',
			offsetY: -10,
			height: 280,
			sparkline: {
				enabled: true
			}
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: "#e7e7e7",
					strokeWidth: '100%',
					margin: 0, // margin is in pixels
					dropShadow: {
						enabled: false,
					}
				},
				dataLabels: {
					name: {
						show: false
					},
					value: {
						offsetY: -2,
						fontSize: '32px'
					}
				}
			}
		},
		grid: {
			padding: {
				top: -10
			}
		},
		responsive: [
			{
			breakpoint: 1600,
			options: {
				chart: {
					height: 220,
				}
			}
			}
		],
		colors: ['#6172F3'],
	};

	var chart2 = new ApexCharts(document.querySelector("#radial_chart_5"), options2);
	chart2.render();

	/*Line*/
	var options3 = {
		series: [{
			data: [75, 66, 41, 89, 73, 21, 44, 2, 32, 9, 14]
		}],
		chart: {
			type: 'line',
			width: 80,
			height: 25,
			sparkline: {
				enabled: true
			}
		},
		colors: ['#6172F3'],
		stroke: {
			width: [2]
		},
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	var chart3 = new ApexCharts(document.querySelector("#sparkline_chart_1"), options3);
	chart3.render();

	var options4 = {
		series: [{
			data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
		}],
		chart: {
			type: 'line',
			width: 80,
			height: 25,
			sparkline: {
				enabled: true
			}
		},
		colors: ['#6172F3'],
		stroke: {
			width: [2]
		},
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	var chart4 = new ApexCharts(document.querySelector("#sparkline_chart_2"), options4);
	chart4.render();

	var options5 = {
		series: [{
			data: [15, 26, 51, 39, 63, 25, 44, 12, 36, 9, 54]
		}],
		chart: {
			type: 'line',
			width: 80,
			height: 25,
			sparkline: {
				enabled: true
			}
		},
		colors: ['#6172F3'],
		stroke: {
			width: [2]
		},
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	var chart5 = new ApexCharts(document.querySelector("#sparkline_chart_3"), options5);
	chart5.render();

	var options6 = {
		series: [{
			data: [1, 3, 51, 39, 7, 25, 44, 12, 36, 9, 10]
		}],
		chart: {
			type: 'line',
			width: 80,
			height: 25,
			sparkline: {
				enabled: true
			}
		},
		colors: ['#6172F3'],
		stroke: {
			width: [2]
		},
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	var chart6 = new ApexCharts(document.querySelector("#sparkline_chart_4"), options6);
	chart6.render();

	var options7 = {
		series: [{
			data: [40, 13, 21, 19, 27, 5, 44, 12, 36, 9, 10]
		}],
		chart: {
			type: 'line',
			width: 80,
			height: 25,
			sparkline: {
				enabled: true
			}
		},
		colors: ['#6172F3'],
		stroke: {
			width: [2]
		},
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	var chart7 = new ApexCharts(document.querySelector("#sparkline_chart_5"), options7);
	chart7.render();

	var options8 = {
		series: [{
			data: [40, 13, 21, 19, 27, 5, 44, 12, 36, 9, 10]
		}],
		chart: {
			type: 'line',
			width: 80,
			height: 25,
			sparkline: {
				enabled: true
			}
		},
		colors: ['#6172F3'],
		stroke: {
			width: [2]
		},
		tooltip: {
			fixed: {
				enabled: false
			},
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				}
			},
			marker: {
				show: false
			}
		}
	};
	var chart8 = new ApexCharts(document.querySelector("#sparkline_chart_6"), options8);
	chart8.render();

},200);
