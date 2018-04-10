var carouselLiCount = 0;
        var updateFeed = function() {
            $('.social-feed-container').socialfeed({
                
				facebook: {
                    accounts: ['<Specify a account>'],
                    limit: 3,
                    access_token: '<APP_ID|APP_SECRET>'
                },
                instagram: {
                    accounts: ['<Specify a account>'],
                    limit: 3,
                    client_id: '<Instagram client id>',
                    access_token: '<Instagram access token>'
                },
                twitter: {
                    accounts: ['<Specify a account>'],
                    limit: 3,
                    consumer_key: '<twitter consumer key>', // make sure to have your app read-only
                    consumer_secret: '<twitter consumer secret', // make sure to have your app read-only
                },
                length: 100,
                show_media: true,
                template_html:'<article class="twitter-post"> \ <p><div><span class="fa fa-{{=it.social_network}}"></span>{{=it.author_name}}</div><div>{{=it.text}}  \ <a href="{{=it.link}}" target="_blank">Read more</a> \</div></p> \ {{=it.attachment}}\ </article>\ ',
                date_format: "ll",//String: Display format of the date attribute (see http://momentjs.com/docs/#/displaying/format/)
                date_locale: "en",//String: The locale of the date (see: http://momentjs.com/docs/#/i18n/changing-locale/)
                moderation: function(content) {
                	setCarouselView(content);
                	carouselLiCount = carouselLiCount+1;
                    return (content.text) ? content.text.indexOf('porn') === -1 : true;
                },
                callback: function() {
                    /** console.log('all posts are collected'); */
                }
            });
        };
        updateFeed();
        $('#button-update').click(function() {
            $('.social-feed-container').html('');

            updateFeed();
        });
        function setCarouselView(content){
        	if(content){
        		var iconClass='blank';
        		if(content.social_network === 'twitter'){
        			iconClass = ' <span id="socialFeedIcon" class="fa fa-twitter"';
        		}
        		else if(content.social_network === 'facebook'){
        			iconClass = ' <span id="socialFeedIcon" class="fa fa-facebook-f"';
        		}
    			else if(content.social_network === 'instagram'){
           			iconClass = ' <span id="socialFeedIcon" class="fa fa-instagram"';
    			}
           		if(content && content != undefined)
           			$(".carouselView"+carouselLiCount).append("<div><p>"+iconClass+"></span>"+content.author_name+"</p><p>"+content.text+" <a href='"+content.link+"' target="+"'_blank'"+">Read more</a></p><div class='social_feed_block'>"+content.attachment+"</div></div>");
        	}
        }