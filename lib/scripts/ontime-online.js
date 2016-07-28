function calc_media_plan() {
	/*
		Предлагаю в этом месте отправлять AJAX-запрос, в ответ — чистый html (как вариант), который можно вставить в <div id="calc_result">
		$('#calc_result').html('html-код таблиц');
	*/
	$('#planning-step-1').fadeOut(300, function() {
		
		$('.tr[radio-value]').click(function() {
			var radio_name = $(this).attr('radio-name'),
				radio_value = $(this).attr('radio-value');
			$('[name='+radio_name+'][value='+radio_value+']').prop('checked', true);
			$('.tr[radio-name='+radio_name+']').removeClass('white-bg');
			$('.tr[radio-name='+radio_name+'][radio-value='+radio_value+']').addClass('white-bg');
		});
		
		$('.tr[radio-value]').removeClass('white-bg');
		$('.table .tr[radio-value]:first').trigger('click');
		
		$('#planning-step-2').fadeIn(300);
	});
	return false;
}

function back_to_planning() {
	$('#planning-step-2').fadeOut(300, function() {
		$('#planning-step-1').fadeIn(300);
	});
	return false;
}

function set_slider_balans(id) {
	if ($('#'+id).length) {
		
		var common_prop = $('#'+id).attr("slider-group"),
			id_arr = [];
			value_arr = [],
			current_tab = parseInt($('#'+id).attr("slider-tab")),
			max_tab = 1,
			min_tab = 1,
			sum = 0,
			i = 0
		;
		
		$('div[slider-group='+common_prop+']').attr("slider-in-progress", 1);
			
		$('div[slider-group='+common_prop+']').each(function() {
			id_arr[$(this).attr("slider-tab")] = $(this).attr("id");
			value_arr[$(this).attr("slider-tab")] = parseInt($(this).slider('value'));
			sum += $(this).slider('value');
			if (parseInt($(this).attr("slider-tab")) > max_tab)
				max_tab = parseInt($(this).attr("slider-tab"));
			if ( parseInt($(this).attr("slider-tab")) < min_tab )
				min_tab = parseInt($(this).attr("slider-tab"));
		});
		
		if (sum != 100) {
			dsum = sum - 100;
			for (i = current_tab+1; i <= max_tab; i++) {
				if (dsum > 0)
					if (value_arr[i] >= dsum) {
						value_arr[i] -= dsum;
						dsum = 0;
					}
					else {
						dsum -= value_arr[i];
						value_arr[i]  = 0;
					}
				if (dsum < 0)
					if (value_arr[i] - dsum <= 100) {
						value_arr[i] -= dsum;
						dsum = 0;
					} else {
						dsum += 100 - value_arr[i];
						value_arr[i] = 100;
					}
			}
			
			for (i = current_tab-1; i >= min_tab; i--) {
				if (dsum > 0)
					if (value_arr[i] >= dsum) {
						value_arr[i] -= dsum;
						dsum = 0;
					}
					else {
						dsum -= value_arr[i];
						value_arr[i]  = 0;
					}
				if (dsum < 0)
					if (value_arr[i] - dsum <= 100) {
						value_arr[i] -= dsum;
						dsum = 0;
					} else {
						dsum += 100 - value_arr[i];
						value_arr[i] = 100;
					}
					/*
					if (100 + dsum <= value_arr[i]) {
						value_arr[i] -= dsum;
						dsum = 0;
					} else {
						dsum += 100 - value_arr[i];
						value_arr[i] = 100;
					}
					*/
			}
		}
		
		for (i = min_tab; i <= max_tab; i++) {
			$('#' + id_arr[i]).slider("option", "value", value_arr[i]);
			//$('#' + id_arr[i]).attr("value", value_arr[i]).slider("refresh");
		}
		
		$('div[slider-group='+common_prop+']').attr("slider-in-progress", 0);
	}
}

function change_form_state() {
	
	/* 1. */
	if ( $('input[type=radio][name=rec_budget]:checked').val() > 0 ) {
		$('#block_1_1').slideDown(300);
		$('#block_1_2').slideUp(300);
	} else {
		$('#block_1_1').slideUp(300);
		$('#block_1_2').slideDown(300);
	}
	
	/* 2. */
	if ( $('input[type=radio][name=gender]:checked').val() > 0 ) {
		$('#block_2_1').slideDown(300);
	} else {
		$('#block_2_1').slideUp(300);
	}
	
	/* 3. */
	if ( $('input[type=radio][name=self_price]:checked').val() > 0 ) {
		//$('#block_3_1 .price').fadeIn(300);
		if ( $('#check_3_1').prop("checked") )
			$('#check_3_1').parent().next('.price').fadeIn(300);
		else
			$('#check_3_1').parent().next('.price').fadeOut(300);
		
		if ( $('#check_3_2').prop("checked") )
			$('#check_3_2').parent().next('.price').fadeIn(300);
		else
			$('#check_3_2').parent().next('.price').fadeOut(300);
		
		if ( $('#check_3_3').prop("checked") )
			$('#check_3_3').parent().next('.price').fadeIn(300);
		else
			$('#check_3_3').parent().next('.price').fadeOut(300);
		
		if ( $('#check_3_4').prop("checked") )
			$('#check_3_4').parent().next('.price').fadeIn(300);
		else
			$('#check_3_4').parent().next('.price').fadeOut(300);
	} else {
		$('#block_3_1 .price').fadeOut(300);
	}
	
	/* 4. */
	if ( $('input[type=radio][name=manual_mode]:checked').val() > 0 ) {
		$('#block_4_1').slideDown(300);
	} else {
		$('#block_4_1').slideUp(300);
	}
}

$(document).ready(function() {
	$('select').niceSelect();
	
	$(".scale-slider").each(
		function() {
			$(this).slider({
			    range: ($(this).attr('slider-range') ? $(this).attr('slider-range') : "min"),
			    step: ($(this).attr('slider-step') ? parseInt($(this).attr('slider-step')) : 10),
			    min: ($(this).attr('slider-min') ? parseInt($(this).attr('slider-min')) : 0),
			    max: ($(this).attr('slider-max') ? parseInt($(this).attr('slider-max')) : 100),
			    value: ($(this).attr('slider-value') ? parseInt($(this).attr('slider-value')) : 0),
			    create: function( event, ui ) {
			    	if ($(this).attr('slider-target'))
			    		$('#'+ $(this).attr('slider-target') ).val( 
			    			$(this).attr('slider-value') ? $(this).attr('slider-value') : 0
			    		);
			    	$(this).attr("slider-in-progress", 0);
			    },
			    change: function( event, ui ) {
			    	if ($(this).attr('slider-target'))
			    		$('#'+ $(this).attr('slider-target') ).val( 
			    			ui.value
			    		);
			    	if ($(this).attr("slider-in-progress") == 0)
			    		set_slider_balans(ui.handle.parentNode.id);
			    },
			})
			.slider("pips", {
				first: "label",
	        	last: "label",
	        	rest: "label"
			})
			.slider("float", {
				suffix: $(this).attr('slider-postfix')
			});
		    
		}
	);
	
	change_form_state();
	$('input[type=radio]').change(function() {
		change_form_state();
	});
	$('input[type=checkbox]').change(function() {
		change_form_state();
	});
	
	$('.tr[radio-value]').click(function() {
		var radio_name = $(this).attr('radio-name'),
			radio_value = $(this).attr('radio-value');
		$('[name='+radio_name+'][value='+radio_value+']').prop('checked', true);
		$('.tr[radio-name='+radio_name+']').removeClass('white-bg');
		$('.tr[radio-name='+radio_name+'][radio-value='+radio_value+']').addClass('white-bg');
	});
	
	$('.tr[radio-value]').removeClass('white-bg');
	$('.table .tr[radio-value]:first').trigger('click');
	
    
});