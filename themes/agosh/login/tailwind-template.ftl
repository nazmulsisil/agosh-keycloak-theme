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
		<link rel="stylesheet" href="${url.resourcesPath}/css/layout.css" />
	
	      
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
		<div class='layout'>
			<div class='layout__left'>	
				<div class='layout__left-content-wrapper'>
					<div class='layout__left-content'>
						<div class='u-divider-5-625rem'></div>
						<img  src="${url.resourcesPath}/img/TRIGO-logo-human.svg" alt="logo" />
						<div class='u-divider-0-25rem'></div>
						<#--  <div class='sign__alert-container'></div>  -->
						
						
						<#--  //////  -->
						<#nested "main">
					</div>	
				</div>
			</div>
			<div class='layout__right'>
				<div class='layout__right-content-wrapper'>				
					<div class='layout__right-content'>
						<div class='u-divider-5-625rem'></div>
						<div class='placeholder' >
							<div class='placeholder__row' >
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-topLeft' >
										<img  src="${url.resourcesPath}/img/01.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-topLeft' >
										<img  src="${url.resourcesPath}/img/02.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-topLeft' >
										<img  src="${url.resourcesPath}/img/03.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-topLeft' >
										<img  src="${url.resourcesPath}/img/04.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-rounded' >
										<img  src="${url.resourcesPath}/img/05.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-bottom' >
										<img  src="${url.resourcesPath}/img/06.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-top' >
										<img  src="${url.resourcesPath}/img/07.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-topLeft' >
										<img  src="${url.resourcesPath}/img/08.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-bottomRight' >
										<img  src="${url.resourcesPath}/img/09.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-left' >
										<img  src="${url.resourcesPath}/img/10.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-right' >
										<img  src="${url.resourcesPath}/img/11.png" alt='placeholder' />
									</div>
									<div class='placeholder__block placeholder__block--delay1 placeholder__block--animation-1 placeholder__block--shape-bipolar' >
										<img  src="${url.resourcesPath}/img/12.png" alt='placeholder' />
									</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>	
	</body>
</html>
</#macro>
