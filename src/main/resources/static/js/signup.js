const activateBtn = (e) => {
	e.prop('disabled', false);
};
	
const deactivateBtn = (e) => {
	e.prop('disabled', true);
};

const validUserName = (event) => {
	
	const userName = $('input[name="userName"]').val();
	
	const $p = $(event.target).parent();
	// 「OK」が表示されていれば削除
	if ($p.has('span').length) {
		$('span').remove();		
	}
	
	deactivateBtn($('#submitBtn'));
	
	$.ajax({
		type: 'POST',
		url: '/ecsite/admin/api/validUserName',
		data: JSON.stringify({ "userName": userName }),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'utf-8'
	})
	.then((result) => {
		
		if (result === "-1") {
			alert("このユーザー名は既に使われています。");
			return;
		}
		
		$('<span />', { 'text': 'OK' }).css('color', 'green').appendTo($p);
		activateBtn($('#submitBtn'));
		validatedName = userName;
		
	}, () => {
		console.error('Error: ajax connection failed.');
	});
};

const checkBlank = (event) => {
	if ($(event.target).val() === "") {
  		deactivateBtn($('#validBtn'));
	} else {
		activateBtn($('#validBtn'));	
	}
};

const detectDiffInput = (event) => {
	if (validatedName === undefined || validatedName === null) {
		return;
	}
	if ($(event.target).val() != validatedName) {
		deactivateBtn($('#submitBtn'));
		$('span').hide();
		return;
	}
	activateBtn($('#submitBtn'));
	$('span').show();
};