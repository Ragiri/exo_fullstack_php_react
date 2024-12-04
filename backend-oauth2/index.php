<?php

define('CLIENT_ID', '');
define('CLIENT_SECRET', '');
define('REDIRECT_URI', 'http://localhost:7070');
define('AUTHORIZATION_URL', 'https://account.withings.com/oauth2_user/authorize2');
define('TOKEN_URL', 'https://wbsapi.withings.net/v2/oauth2');

if (!isset($_GET['code'])) {
	$authUrl = AUTHORIZATION_URL . '?' . http_build_query([
		'response_type' => 'code',
		'client_id' => CLIENT_ID,
		'redirect_uri' => REDIRECT_URI,
		'scope' => 'user.info,user.metrics,user.activity',
		'state' => 'STATE',
		'mode' => 'demo',
	]);
	header('Location: ' . $authUrl);
	exit;
}

if (isset($_GET['code'])) {
	$code = $_GET['code'];
	$postData = [
		'action' => 'requesttoken',
		'grant_type' => 'authorization_code',
		'client_id' => CLIENT_ID,
		'client_secret' => CLIENT_SECRET,
		'code' => $code,
		'redirect_uri' => REDIRECT_URI,
	];

	$ch = curl_init(TOKEN_URL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
	$response = curl_exec($ch);
	curl_close($ch);

	$rspData = json_decode($response, true);

	if (isset($rspData['body']['access_token'])) {
		$accessToken = $rspData['body']['access_token'];
		$refreshToken = $rspData['body']['refresh_token'];

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://wbsapi.withings.net/measure");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, [
			'Authorization: Bearer ' . $accessToken
		]);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
			'action' => 'getmeas',
			'meastype' => 1,
			'category' => 1,
		]));

		$rsp = curl_exec($ch);
		curl_close($ch);
		$obj = json_decode($rsp);
		var_dump($obj->body->measuregrps[0]);
	} else {
		echo 'Error: ' . $rspData['status'] . '<br>';
	}
}

?>

<html>

<head>
	<title>Withings Oauth2</title>
</head>

<body>
	<form action="index.php" method="GET">
		<button type="submit">Authorize Withings</button>
	</form>
</body>

</html>