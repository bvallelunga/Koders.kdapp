//coment
class KodersMainView extends KDView

	constructor:(options = {}, data)->
		options.cssClass = 'koders main-view'
		super options, data

		viewAppended:->
			@searchField = new KDInputView
			placeholder: "Search for fellow koders by name and press enter..."
			cssClass : "search"
			type: "text"

			@searchField.on "keyup", (event)=>
				if event.which is 13
					$(".results").html ""  
					@name = @searchField.getValue().split(" ")

					KD.remote.api.JAccount.some(
						"profile.firstName" : @name[0],
						"profile.lastName" : @name[1],                      
						,
						limit: 20
					).then =>
	@results = []

	for account in arguments[0]
		@results.push(
			"""
<a href="/#{ account.profile.nickname}" class="result">
<div class="avatar">
<img src="#{ account.profile.avatar || 'https://www.gravatar.com/avatar/' + account.profile.hash + '?s=200&d=identicon' }"/>
</div>
<div class="information">
<div class="name">
#{account.profile.firstName}
#{account.profile.lastName}
</div>
<div class="nickname">
#{account.profile.nickname}
</div>
<div class="about">
#{account.profile.about || ""}
</div>
</div>
<div class="clear"></div>
</a>
"""
		)

$(".results").html @results.join("")


@addSubView @searchField
@addSubView new KDView
cssClass : "results"

class KodersController extends AppController

	constructor:(options = {}, data)->
		options.view    = new KodersMainView
		options.appInfo =
		name : "Koders"
		type : "application"

		super options, data

		do ->

			# In live mode you can add your App view to window's appView
			if appView?

				view = new KodersMainView
				appView.addSubView view

				else

					KD.registerAppClass KodersController,
					name     : "Koders"
					routes   :
					"/:name?/Koders" : null
					"/:name?/bvallelunga/Apps/Koders" : null
					dockPath : "/bvallelunga/Apps/Koders"
      behavior : "application"