<#macro loginLayout>
<!DOCTYPE html>
<html class="h-full bg-gray-50">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="robots" content="noindex, nofollow">
		<#if properties.meta?has_content>
			<#list properties.meta?split(' ') as meta>
				<meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
			</#list>
		</#if>
		<title>${msg("loginTitle",(realm.displayName!''))}</title>
		<link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />

		<link rel="stylesheet" href="${url.resourcesPath}/css/styles.css" />
		<link rel="stylesheet" href="${url.resourcesPath}/css/tokens.css" />
		<link rel="stylesheet" href="${url.resourcesPath}/css/custom-tokens.css" />
		<link rel="stylesheet" href="${url.resourcesPath}/css/login.css" />
	
	      
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      
	</head>
	<body class="h-full flex flex-col">
	 
	 <#nested "main">
	 <#--  <div class='testing-hello'> hello </div>
	 <div class='testing-hello'> hello how are you </div>  -->
		
	</body>
</html>
</#macro>
