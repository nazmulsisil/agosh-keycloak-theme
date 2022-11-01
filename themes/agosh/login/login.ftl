<#import "tailwind-template.ftl" as template>
<@template.loginLayout ; section>
	<#if section = "main">
	<div class='sign__wrapper'>
	<div class='sign__container'>
	
<div class='divider-5-625rem' ></div>
	<img  src="${url.resourcesPath}/img/TRIGO-logo-human.svg" alt="logo" />
     <div class='alert-container'></div>
   
    <div class='headline'>Sign in to your Agosh account</div>
	<div class='divider-0-75rem' ></div>

	 <div class='sub-headline'>
        Use your email or another service to continue with Agosh (it's free)
        <span role="img" aria-label="">
          ⚡️!
        </span>
      </div>
	<div class='divider-2rem' ></div>

	   <form onSubmit={onSubmit}>
        <input
          data-cy="sign-in-email-input"
          label="Email"
        />
        <div class='divider-1-5rem' ></div>
        <input
          data-cy="sign-in-password-input"
          label="Password"
          type="password"         
        />
        <div class='divider' ></div>
        <input   type='checkbox'      
          ref={rememberMeRef}
        />
          <div class='checkbox-text-wrapper'>Remember me</div>
        

        <div class='divider-2-5rem'> </div>
        <div>
          <span class='term-text-wrapper'>
            By continuing, you're confirming that you've read and agree to our
          </span>
          <a class='link-text-wrapper' data-cy="sign-up-terms" href={urlTerms} variant="text">
            Terms and Conditions
          </a>
          ,
          <a class='link-text-wrapper' data-cy="sign-up-privacy" href={urlPrivacy} variant="text">
           Privacy Policy
          </a>
          <span class='link-text-wrapper'>and</span>
          <a class='link-text-wrapper' href={urlCookiePolicy} variant="text">
           Cookie Policy
          </a>
        </div>
        <div class='divider-1-5rem'></div>
        <div class='grid-between'>
          <div>
            <a href='#'
              data-cy="sign-in-forgot-password"
              onClick={handleClickForgotPassword}
              text-link-bold=""
              variant="text"
            >
              Forgot my password
            </a>
          </div>

          <button
            data-cy="sign-in-submit"
            variant="filled"
            fluid
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
	</div>
	</div>
    </#if>
</@template.loginLayout>
