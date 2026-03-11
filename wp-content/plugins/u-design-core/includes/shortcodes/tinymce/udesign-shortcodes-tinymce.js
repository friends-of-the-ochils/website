(function() {
        
	tinymce.PluginManager.add( 'udesign_core_shortcodes_mce_button', function( editor, url ) {
		editor.addButton( 'udesign_core_shortcodes_mce_button', {
			title: 'buttonTitle',
			type: 'menubutton',
			icon: 'icon udesign-shortcodes-icon',
			menu: [

				/** Layout Start **/
				{
					text: 'layoutText',
                                        icon: 'icon dashicons-layout',
					menu: [

						/* Columns Start */
						{
							text: 'columnsText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'columnsTitle',
									body: [

									// Column Size
									{
										type: 'listbox',
										name: 'columnArrangement',
										label: 'columnArrangementLabel',
										values: [
                                                                                    
											{text: '1/4 | 1/4 | 1/4 | 1/4', value: '1/4|1/4|1/4|1/4'},
											{text: '1/4 | 3/4', value: '1/4|3/4'},
											{text: '3/4 | 1/4', value: '3/4|1/4'},
											{text: '1/4 | 1/4 | 1/2', value: '1/4|1/4|1/2'},
											{text: '1/2 | 1/4 | 1/4', value: '1/2|1/4|1/4'},
											{text: '1/4 | 1/2 | 1/4', value: '1/4|1/2|1/4'},
											{text: '1/3 | 1/3 | 1/3', value: '1/3|1/3|1/3'},
											{text: '1/3 | 2/3', value: '1/3|2/3'},
											{text: '2/3 | 1/3', value: '2/3|1/3'},
											{text: '1/2 | 1/2', value: '1/2|1/2'},
											{text: '1/4', value: 'one_fourth'},
											{text: '1/4 (last)', value: 'one_fourth_last'},
											{text: '1/3', value: 'one_third'},
											{text: '1/3 (last)', value: 'one_third_last'},
											{text: '1/2', value: 'one_half'},
											{text: '1/2 (last)', value: 'one_half_last'},
											{text: '2/3', value: 'two_third'},
											{text: '2/3 (last)', value: 'two_third_last'},
											{text: '3/4', value: 'three_fourth'},
											{text: '3/4 (last)', value: 'three_fourth_last'},
										],
                                                                                // value : 'one_fourth' // Sets the default
									},

									// Column Content
									{
										type: 'textbox',
										name: 'columnContent',
										label: 'columnContentLabel',
										value: 'Your content here...',
										multiline: true,
										minWidth: 300,
										minHeight: 100
									} ],
									onsubmit: function( e ) {
                                                                            
                                                                                var $shortcodetext = '',
                                                                                    $columnArrangement = e.data.columnArrangement,
                                                                                    $columnContent = e.data.columnContent;

                                                                                switch ( $columnArrangement ) {

                                                                                        // Grouped Sets:
                                                                                        case '1/4|1/4|1/4|1/4':
                                                                                            $shortcodetext = '[one_fourth]' + $columnContent + '[/one_fourth] [one_fourth]' + $columnContent + '[/one_fourth] [one_fourth]' + $columnContent + '[/one_fourth] [one_fourth_last]' + $columnContent + '[/one_fourth_last]';
                                                                                            break;
                                                                                        case '1/4|3/4':
                                                                                            $shortcodetext = '[one_fourth]' + $columnContent + '[/one_fourth] [three_fourth_last]' + $columnContent + '[/three_fourth_last]';
                                                                                            break;
                                                                                        case '3/4|1/4':
                                                                                            $shortcodetext = '[three_fourth]' + $columnContent + '[/three_fourth] [one_fourth_last]' + $columnContent + '[/one_fourth_last]';
                                                                                            break;
                                                                                        case '1/4|1/4|1/2':
                                                                                            $shortcodetext = '[one_fourth]' + $columnContent + '[/one_fourth] [one_fourth]' + $columnContent + '[/one_fourth] [one_half_last]' + $columnContent + '[/one_half_last]';
                                                                                            break;
                                                                                        case '1/2|1/4|1/4':
                                                                                            $shortcodetext = '[one_half]' + $columnContent + '[/one_half] [one_fourth]' + $columnContent + '[/one_fourth] [one_fourth_last]' + $columnContent + '[/one_fourth_last]';
                                                                                            break;
                                                                                        case '1/4|1/2|1/4':
                                                                                            $shortcodetext = '[one_fourth]' + $columnContent + '[/one_fourth] [one_half]' + $columnContent + '[/one_half] [one_fourth_last]' + $columnContent + '[/one_fourth_last]';
                                                                                            break;
                                                                                        case '1/3|1/3|1/3':
                                                                                            $shortcodetext = '[one_third]' + $columnContent + '[/one_third] [one_third]' + $columnContent + '[/one_third] [one_third_last]' + $columnContent + '[/one_third_last]';
                                                                                            break;
                                                                                        case '1/3|2/3':
                                                                                            $shortcodetext = '[one_third]' + $columnContent + '[/one_third] [two_third_last]' + $columnContent + '[/two_third_last]';
                                                                                            break;
                                                                                        case '2/3|1/3':
                                                                                            $shortcodetext = '[two_third]' + $columnContent + '[/two_third] [one_third_last]' + $columnContent + '[/one_third_last]';
                                                                                            break;
                                                                                        case '1/2|1/2':
                                                                                            $shortcodetext = '[one_half]' + $columnContent + '[/one_half] [one_half_last]' + $columnContent + '[/one_half_last]';
                                                                                            break;
                                                                                        // Single Column
                                                                                        case 'one_fourth': // One Fourth
                                                                                            $shortcodetext = '[one_fourth]' + $columnContent + '[/one_fourth]';
                                                                                            break;
                                                                                        case 'one_fourth_last':
                                                                                            $shortcodetext = '[one_fourth_last]' + $columnContent + '[/one_fourth_last]';
                                                                                            break;
                                                                                        case 'one_third': // One Third
                                                                                            $shortcodetext = '[one_third]' + $columnContent + '[/one_third]';
                                                                                            break;
                                                                                        case 'one_third_last':
                                                                                            $shortcodetext = '[one_third_last]' + $columnContent + '[/one_third_last]';
                                                                                            break;
                                                                                        case 'one_half': // One Half
                                                                                            $shortcodetext = '[one_half]' + $columnContent + '[/one_half]';
                                                                                            break;
                                                                                        case 'one_half_last':
                                                                                            $shortcodetext = '[one_half_last]' + $columnContent + '[/one_half_last]';
                                                                                            break;
                                                                                        case 'two_third': // Two Third
                                                                                            $shortcodetext = '[two_third]' + $columnContent + '[/two_third]';
                                                                                            break;
                                                                                        case 'two_third_last':
                                                                                            $shortcodetext = '[two_third_last]' + $columnContent + '[/two_third_last]';
                                                                                            break;
                                                                                        case 'three_fourth': // Three Fourth
                                                                                            $shortcodetext = '[three_fourth]' + $columnContent + '[/three_fourth]';
                                                                                            break;
                                                                                        case 'three_fourth_last':
                                                                                            $shortcodetext = '[three_fourth_last]' + $columnContent + '[/three_fourth_last]';
                                                                                            
                                                                                }
                                                                                
										editor.insertContent( $shortcodetext );
									}
								});
							}
						}, // End columns

						/* Dividers Start */
						{
							text: 'dividersText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'dividersTitle',
									body: [

									// Divider Style
									{
										type: 'listbox',
										name: 'dividerStyle',
										label: 'dividerStyleLabel',
										values: [
											{text: 'dividerStyleValuesTextDivider', value: 'divider'},
											{text: 'dividerStyleValuesTextDividerTop', value: 'divider_top'},
											{text: 'dividerStyleValuesTextClear', value: 'clear'}
										],
                                                                                minWidth: 300,
									} ],
									onsubmit: function( e ) {
										editor.insertContent('[' + e.data.dividerStyle + ']');
									}
								});
							}
						} // End divider

					]
				}, // End Layout Section


				/** Buttons **/
				{
					text: 'buttonsText',
                                        icon: 'icon dashicons-external',
					menu: [

						/* Flat Button Start */
						{
							text: 'flatButtonText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'flatButtonTitle',
									body: [

									// Button Text
									{
										type: 'textbox',
										name: 'flatButtonText',
										label: 'flatButtonTextLabel',
										value: 'Flat Button'
									},

									// Button Title
									{
										type: 'textbox',
										name: 'flatButtonTitle',
										label: 'flatButtonTitleLabel',
										value: 'Flat Button'
									},

									// Button URL
									{
										type: 'textbox',
										name: 'flatButtonUrl',
										label: 'flatButtonUrlLabel',
										value: 'http://www.example.com/'
									},

									// Button Padding
									{
										type: 'textbox',
										name: 'flatButtonPadding',
										label: 'flatButtonPaddingLabel',
										value: '10px 20px'
									},

									// Button Background Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'flatButtonBackgroundColor',
                                                                                label: 'flatButtonBackgroundColorLabel',
                                                                                value: 'transparent',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Button Border Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'flatButtonBorderColor',
                                                                                label: 'flatButtonBorderColorLabel',
                                                                                value: '#ff5c00',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Button Border Width
									{
										type: 'textbox',
										name: 'flatButtonBorderWidth',
										label: 'flatButtonBorderWidthLabel',
										value: '1px'
									},

									// Button Text Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'flatButtonTextColor',
                                                                                label: 'flatButtonTextColorLabel',
                                                                                value: '#000000',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Button Text Size
									{
										type: 'textbox',
										name: 'flatButtonTextSize',
										label: 'flatButtonTextSizeLabel',
										value: '14px'
									},

									// Button Alignment
									{
										type: 'listbox',
										name: 'flatButtonAlignment',
										label: 'flatButtonAlignmentLabel',
										values: [
											{text: 'flatButtonAlignmentValuesLeft', value: 'left'},
											{text: 'flatButtonAlignmentValuesRight', value: 'right'},
											{text: 'flatButtonAlignmentValuesCenter', value: 'center'},
											{text: 'flatButtonAlignmentValuesNone', value: 'none'}
										]
									},

									// Button Link Target
									{
										type: 'listbox',
										name: 'flatButtonLinkTarget',
										label: 'flatButtonLinkTargetLabel',
										values: [
											{text: 'flatButtonLinkTargetValuesSelf', value: '_self'},
											{text: 'flatButtonLinkTargetValuesBlank', value: '_blank'}
										]
									} ],
									onsubmit: function( e ) {
                                                                                editor.insertContent('[flat_button text="' + e.data.flatButtonText + '" title="' + e.data.flatButtonTitle + '" url="' + e.data.flatButtonUrl + '" padding="' + e.data.flatButtonPadding + '" bg_color="' + e.data.flatButtonBackgroundColor + '" border_color="' + e.data.flatButtonBorderColor + '" border_width="' + e.data.flatButtonBorderWidth + '" text_color="' + e.data.flatButtonTextColor + '" text_size="' + e.data.flatButtonTextSize + '" align="' + e.data.flatButtonAlignment + '" target="' + e.data.flatButtonLinkTarget + '"]');
									}
								});
							}
						}, // End flat button

						/* Simple Button Start */
						{
							text: 'simpleButtonText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'simpleButtonTitle',
									body: [

									// Button Type
									{
										type: 'listbox',
										name: 'simpleButtonType',
										label: 'simpleButtonTypeLabel',
										values: [
											{text: 'simpleButtonTypeValuesDefault', value: 'button'},
											{text: 'simpleButtonTypeValuesSmall', value: 'small_button'},
											{text: 'simpleButtonTypeValuesRound', value: 'round_button'}
										]
									},
                                                                        
									// Button Text
									{
										type: 'textbox',
										name: 'simpleButtonText',
										label: 'simpleButtonTextLabel',
										value: 'Simple Button'
									},

									// Button Title
									{
										type: 'textbox',
										name: 'simpleButtonTitle',
										label: 'simpleButtonTitleLabel',
										value: 'Simple Button'
									},

									// Button URL
									{
										type: 'textbox',
										name: 'simpleButtonUrl',
										label: 'simpleButtonUrlLabel',
										value: 'http://www.example.com/'
									},

									// Button Style
									{
										type: 'listbox',
										name: 'simpleButtonStyle',
										label: 'simpleButtonStyleLabel',
										values: [
											{text: 'simpleButtonStyleValuesDark', value: 'dark'},
											{text: 'simpleButtonStyleValuesLight', value: 'light'}
										]
									},

									// Button Alignment
									{
										type: 'listbox',
										name: 'simpleButtonAlignment',
										label: 'simpleButtonAlignmentLabel',
										values: [
											{text: 'simpleButtonAlignmentValuesLeft', value: 'left'},
											{text: 'simpleButtonAlignmentValuesRight', value: 'right'},
											{text: 'simpleButtonAlignmentValuesCenter', value: 'center'}
										]
									},

									// Button Link Target
									{
										type: 'listbox',
										name: 'simpleButtonLinkTarget',
										label: 'simpleButtonLinkTargetLabel',
										values: [
											{text: 'simpleButtonLinkTargetValuesSelf', value: '_self'},
											{text: 'simpleButtonLinkTargetValuesBlank', value: '_blank'}
										]
									} ],
									onsubmit: function( e ) {
                                                                                editor.insertContent('[' + e.data.simpleButtonType + ' text="' + e.data.simpleButtonText + '" title="' + e.data.simpleButtonTitle + '" url="' + e.data.simpleButtonUrl + '" style="' + e.data.simpleButtonStyle + '" align="' + e.data.simpleButtonAlignment + '" target="' + e.data.simpleButtonLinkTarget + '"]');
									}
								});
							}
						}, // End simple button

						/* Custom Button Start */
						{
							text: 'customButtonText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'customButtonTitle',
									body: [

									// Button Text
									{
										type: 'textbox',
										name: 'customButtonText',
										label: 'customButtonTextLabel',
										value: 'Custom Button'
									},

									// Button Title
									{
										type: 'textbox',
										name: 'customButtonTitle',
										label: 'customButtonTitleLabel',
										value: 'Custom Button'
									},

									// Button URL
									{
										type: 'textbox',
										name: 'customButtonUrl',
										label: 'customButtonUrlLabel',
										value: 'http://www.example.com/'
									},

									// Button Size
									{
										type: 'listbox',
										name: 'customButtonSize',
										label: 'customButtonSizeLabel',
										values: [
											{text: 'customButtonSizeValuesSmall', value: 'small'},
											{text: 'customButtonSizeValuesMedium', value: 'medium'},
											{text: 'customButtonSizeValuesLarge', value: 'large'},
											{text: 'customButtonSizeValuesXLarge', value: 'x-large'}
										],
                                                                                value : 'large' // Sets the default
									},

									// Button Background Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'customButtonBackgroundColor',
                                                                                label: 'customButtonBackgroundColorLabel',
                                                                                value: '#ff5c00',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Button Text Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'customButtonTextColor',
                                                                                label: 'customButtonTextColorLabel',
                                                                                value: '#ffffff',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Button Alignment
									{
										type: 'listbox',
										name: 'customButtonAlignment',
										label: 'customButtonAlignmentLabel',
										values: [
											{text: 'customButtonAlignmentValuesLeft', value: 'left'},
											{text: 'customButtonAlignmentValuesRight', value: 'right'},
											{text: 'customButtonAlignmentValuesCenter', value: 'center'},
											{text: 'customButtonAlignmentValuesNone', value: 'none'}
										]
									},

									// Button Link Target
									{
										type: 'listbox',
										name: 'customButtonLinkTarget',
										label: 'customButtonLinkTargetLabel',
										values: [
											{text: 'customButtonLinkTargetValuesSelf', value: '_self'},
											{text: 'customButtonLinkTargetValuesBlank', value: '_blank'}
										]
									} ],
									onsubmit: function( e ) {
                                                                                editor.insertContent('[custom_button text="' + e.data.customButtonText + '" title="' + e.data.customButtonTitle + '" url="' + e.data.customButtonUrl + '" size="' + e.data.customButtonSize + '" bg_color="' + e.data.customButtonBackgroundColor + '" text_color="' + e.data.customButtonTextColor + '" align="' + e.data.customButtonAlignment + '" target="' + e.data.customButtonLinkTarget + '"]');
									}
								});
							}
						}, // End custom button

						/* Custom More Link Start */
						{
							text: 'customMoreLinkText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'customMoreLinkTitle',
									body: [

									// Link Text
									{
										type: 'textbox',
										name: 'customMoreLinkText',
										label: 'customMoreLinkTextLabel',
										value: 'Read more'
									},

									// Link Title
									{
										type: 'textbox',
										name: 'customMoreLinkTitle',
										label: 'customMoreLinkTitleLabel',
										value: 'Read more'
									},

									// Link URL
									{
										type: 'textbox',
										name: 'customMoreLinkUrl',
										label: 'customMoreLinkUrlLabel',
										value: 'http://www.example.com/'
									},

									// Button Alignment
									{
										type: 'listbox',
										name: 'customMoreLinkAlignment',
										label: 'customMoreLinkAlignmentLabel',
										values: [
											{text: 'customMoreLinkAlignmentValuesLeft', value: 'left'},
											{text: 'customMoreLinkAlignmentValuesRight', value: 'right'}
										]
									},

									// Button Link Target
									{
										type: 'listbox',
										name: 'customMoreLinkTarget',
										label: 'customMoreLinkTargetLabel',
										values: [
											{text: 'customMoreLinkTargetValuesSelf', value: '_self'},
											{text: 'customMoreLinkTargetValuesBlank', value: '_blank'}
										]
									} ],
									onsubmit: function( e ) {
                                                                                editor.insertContent('[read_more text="' + e.data.customMoreLinkText + '" title="' + e.data.customMoreLinkTitle + '" url="' + e.data.customMoreLinkUrl + '" align="' + e.data.customMoreLinkAlignment + '" target="' + e.data.customMoreLinkTarget + '"]');
									}
								});
							}
						}, // End Custom More Link


					]
				}, // End Buttons Section


				/** Content Start **/
				{
                                        text: 'contentText',
                                        icon: 'icon dashicons-edit',
                                        menu: [

						/* Content Block Start */
						{
							text: 'contentBlockText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'contentBlockTitle',
                                                                        width: 520,
                                                                        height: 600,
                                                                        autoScroll: true,
									body: [

									// The Content
									{
										type: 'textbox',
										name: 'contentBlockContent',
										label: 'contentBlockContentLabel',
										value: "I am text block. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
										multiline: true,
										minWidth: 270,
										minHeight: 100
									},
                                                                        
                                                                        // Image Upload
                                                                        {
                                                                                type: 'textbox',
                                                                                name: 'contentBlockBackgroundImageURL',
                                                                                label: 'contentBlockBackgroundImageURLLabel',
                                                                                value: '',
                                                                                classes: 'u-design-shortcodes-input-image-url',
                                                                                tooltip: 'contentBlockBackgroundImageURLTooltip',
                                                                        },
                                                                        {
                                                                                type: 'button',
                                                                                name: 'contentBlockUploadButton',
                                                                                label: ' ',
                                                                                text: 'contentBlockUploadButtonText',
                                                                                classes: 'upload-button-for-image-url'
                                                                        },

									// Background Stretch
									{
										type: 'listbox',
										name: 'contentBlockBackgroundStretch',
										label: 'contentBlockBackgroundStretchLabel',
										values: [
											{text: 'contentBlockBackgroundStretchValuesYes', value: 'yes'},
											{text: 'contentBlockBackgroundStretchValuesNo', value: 'no'}
										],
                                                                                tooltip: 'contentBlockBackgroundStretchTooltip'
									},

									// Fixed Background
									{
										type: 'listbox',
										name: 'contentBlockFixedBackground',
										label: 'contentBlockFixedBackgroundLabel',
										values: [
											{text: 'contentBlockFixedBackgroundValuesYes', value: 'yes'},
											{text: 'contentBlockFixedBackgroundValuesNo', value: 'no'}
										],
                                                                                tooltip: 'contentBlockFixedBackgroundTooltip'
									},
                                                                        
									// Background Position
									{
										type: 'textbox',
										name: 'contentBlockBackgroundPosition',
										label: 'contentBlockBackgroundPositionLabel',
										value: 'center top',
                                                                                tooltip: 'contentBlockBackgroundPositionTooltip'
									},

									// Background Repeat
									{
										type: 'listbox',
										name: 'contentBlockBackgroundRepeat',
										label: 'contentBlockBackgroundRepeatLabel',
										values: [
											{text: 'no-repeat', value: 'no-repeat'},
											{text: 'repeat', value: 'repeat'},
											{text: 'repeat-x', value: 'repeat-x'},
											{text: 'repeat-y', value: 'repeat-y'},
											{text: 'initial', value: 'initial'},
											{text: 'inherit', value: 'inherit'}
										]
									},

									// Background Size
									{
										type: 'listbox',
										name: 'contentBlockBackgroundSize',
										label: 'contentBlockBackgroundSizeLabel',
										values: [
											{text: 'auto', value: 'auto'},
											{text: 'cover', value: 'cover'},
											{text: 'contain', value: 'contain'},
											{text: 'initial', value: 'initial'},
											{text: 'inherit', value: 'inherit'}
										]
									},

									// Parallax Scroll
									{
										type: 'listbox',
										name: 'contentBlockParallaxScroll',
										label: 'contentBlockParallaxScrollLabel',
										values: [
											{text: 'contentBlockParallaxScrollValuesNo', value: 'no'},
											{text: 'contentBlockParallaxScrollValuesYes', value: 'yes'}
										],
                                                                                tooltip: 'contentBlockParallaxScrollTooltip'
									},

									// Background Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'contentBlockBackgroundColor',
                                                                                label: 'contentBlockBackgroundColorLabel',
                                                                                value: '#7a7a7a',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},
                                                                        
									// Content Padding
									{
										type: 'textbox',
										name: 'contentBlockContentPadding',
										label: 'contentBlockContentPaddingLabel',
										value: '60px 0',
                                                                                tooltip: 'contentBlockContentPaddingTooltip'
									},
                                                                        
                                                                        
                                                                        
									// Button Border Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'flatButtonBorderColor',
                                                                                label: 'flatButtonBorderColorLabel',
                                                                                value: '#ff5c00',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Button Border Width
									{
										type: 'textbox',
										name: 'flatButtonBorderWidth',
										label: 'flatButtonBorderWidthLabel',
										value: '1px'
									},

									// Text Color
									{
                                                                                type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                name: 'contentBlockTextColor',
                                                                                label: 'contentBlockTextColorLabel',
                                                                                value: '#ffffff',
                                                                                classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                onaction: createColorPickAction()
									},

									// Custom Class
									{
										type: 'textbox',
										name: 'contentBlockCustomClass',
										label: 'contentBlockCustomClassLabel',
										value: '',
                                                                                tooltip: 'contentBlockCustomClassTooltip'
									} ],
									onsubmit: function( e ) {
                                                                                editor.insertContent('[content_block bg_image="' + e.data.contentBlockBackgroundImageURL + '" max_bg_width="' + e.data.contentBlockBackgroundStretch + '" bg_fixed="' + e.data.contentBlockFixedBackground + '" bg_position="' + e.data.contentBlockBackgroundPosition + '" bg_repeat="' + e.data.contentBlockBackgroundRepeat + '" bg_size="' + e.data.contentBlockBackgroundSize + '" parallax_scroll="' + e.data.contentBlockParallaxScroll + '" bg_color="' + e.data.contentBlockBackgroundColor + '" content_padding="' + e.data.contentBlockContentPadding + '" font_color="' + e.data.contentBlockTextColor + '" class="' + e.data.contentBlockCustomClass + '"]' + e.data.contentBlockContent + '[/content_block]');
									}
								});
							}
						}, // End Content Block
                                                
						/* Message Box Start */
						{
							text: 'messageBoxText',
                                                        menu: [
                                                            
                                                            /* Predefined Message Box Start */
                                                            {
                                                                    text: 'predefinedMessageBoxText',
                                                                    onclick: function() {
                                                                            editor.windowManager.open( {
                                                                                    title: 'messageBoxTitle',
                                                                                    body: [

                                                                                    // The Content
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'messageBoxContent',
                                                                                            label: 'messageBoxContentLabel',
                                                                                            value: 'Replace this text with your message...',
                                                                                            multiline: true,
                                                                                            minWidth: 270,
                                                                                            minHeight: 60
                                                                                    },
                                                                                    
                                                                                    // Message Box Type
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'messageBoxType',
                                                                                            label: 'messageBoxTypeLabel',
                                                                                            values: [
                                                                                                    {text: 'messageBoxTypeValuesInfo', value: 'info'},
                                                                                                    {text: 'messageBoxTypeValuesSuccess', value: 'success'},
                                                                                                    {text: 'messageBoxTypeValuesWarning', value: 'warning'},
                                                                                                    {text: 'messageBoxTypeValuesErroneous', value: 'erroneous'}
                                                                                            ]
                                                                                    },

                                                                                    // Custom Class
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'messageBoxCustomClass',
                                                                                            label: 'messageBoxCustomClassLabel',
                                                                                            value: '',
                                                                                            tooltip: 'messageBoxCustomClassTooltip'
                                                                                    } ],
                                                                                    onsubmit: function( e ) {
                                                                                            editor.insertContent('[message type="' + e.data.messageBoxType + '" class="' + e.data.messageBoxCustomClass + '"]' + e.data.messageBoxContent + '[/message]');
                                                                                    }
                                                                            });
                                                                    }
                                                            }, // End Predefined Message Box
                                                            
                                                            /* Custom Message Box Start */
                                                            {
                                                                    text: 'customMessageBoxText',
                                                                    onclick: function() {
                                                                            editor.windowManager.open( {
                                                                                    title: 'customMessageBoxTitle',
                                                                                    body: [

                                                                                    // The Content
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'customMessageBoxContent',
                                                                                            label: 'customMessageBoxContentLabel',
                                                                                            value: 'Replace this text with your message...',
                                                                                            multiline: true,
                                                                                            minWidth: 270,
                                                                                            minHeight: 60
                                                                                    },
                                                                                    
                                                                                    // Message Box Width
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'customMessageBoxWidth',
                                                                                            label: 'customMessageBoxWidthLabel',
                                                                                            value: '100%',
                                                                                            tooltip: 'customMessageBoxWidthTooltip'
                                                                                    },

                                                                                    // Message Box Start Color
                                                                                    {
                                                                                            type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                            name: 'customMessageBoxStartColor',
                                                                                            label: 'customMessageBoxStartColorLabel',
                                                                                            value: '#fffcb5',
                                                                                            classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                            onaction: createColorPickAction()
                                                                                    },

                                                                                    // Message Box End Color
                                                                                    {
                                                                                            type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                            name: 'customMessageBoxEndColor',
                                                                                            label: 'customMessageBoxEndColorLabel',
                                                                                            value: '#f4cbcb',
                                                                                            classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                            onaction: createColorPickAction()
                                                                                    },

                                                                                    // Message Box Border Color
                                                                                    {
                                                                                            type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                            name: 'customMessageBoxBorderColor',
                                                                                            label: 'customMessageBoxBorderColorLabel',
                                                                                            value: '#bbbbbb',
                                                                                            classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                            onaction: createColorPickAction()
                                                                                    },

                                                                                    // Message Box Text Color
                                                                                    {
                                                                                            type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                            name: 'customMessageBoxTextColor',
                                                                                            label: 'customMessageBoxTextColorLabel',
                                                                                            value: '#333333',
                                                                                            classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                            onaction: createColorPickAction()
                                                                                    },
                                                                                    
                                                                                    // Message Box Alignment
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'customMessageBoxAlignment',
                                                                                            label: 'customMessageBoxAlignmentLabel',
                                                                                            values: [
                                                                                                    {text: 'customMessageBoxAlignmentValuesLeft', value: 'left'},
                                                                                                    {text: 'customMessageBoxAlignmentValuesCenter', value: 'center'},
                                                                                                    {text: 'customMessageBoxAlignmentValuesRight', value: 'right'}
                                                                                            ]
                                                                                    },

                                                                                    // Custom Class
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'customMessageBoxCustomClass',
                                                                                            label: 'customMessageBoxCustomClassLabel',
                                                                                            value: '',
                                                                                            tooltip: 'customMessageBoxCustomClassTooltip'
                                                                                    } ],
                                                                                    onsubmit: function( e ) {
                                                                                            editor.insertContent('[message type="custom" width="' + e.data.customMessageBoxWidth + '" start_color="' + e.data.customMessageBoxStartColor + '" end_color="' + e.data.customMessageBoxEndColor + '" border="' + e.data.customMessageBoxBorderColor + '" color="' + e.data.customMessageBoxTextColor + '" align="' + e.data.customMessageBoxAlignment + '" class="' + e.data.customMessageBoxCustomClass + '"]' + e.data.customMessageBoxContent + '[/message]');
                                                                                    }
                                                                            });
                                                                    }
                                                            }, // End Custom Message Box
                                                            
                                                            /* Simple Message Box Start */
                                                            {
                                                                    text: 'simpleMessageBoxText',
                                                                    onclick: function() {
                                                                            editor.windowManager.open( {
                                                                                    title: 'simpleMessageBoxTitle',
                                                                                    body: [

                                                                                    // The Content
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'simpleMessageBoxContent',
                                                                                            label: 'simpleMessageBoxContentLabel',
                                                                                            value: 'Replace this text with your message...',
                                                                                            multiline: true,
                                                                                            minWidth: 270,
                                                                                            minHeight: 60
                                                                                    },

                                                                                    // Message Box Border Color
                                                                                    {
                                                                                            type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                            name: 'simpleMessageBoxBackgroundColor',
                                                                                            label: 'simpleMessageBoxBackgroundColorLabel',
                                                                                            value: '#eeeeee',
                                                                                            classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                            onaction: createColorPickAction()
                                                                                    },

                                                                                    // Message Box Text Color
                                                                                    {
                                                                                            type: 'colorbox',  // colorpicker plugin MUST be included for this to work
                                                                                            name: 'simpleMessageBoxTextColor',
                                                                                            label: 'simpleMessageBoxTextColorLabel',
                                                                                            value: '#333333',
                                                                                            classes: 'u-design-shortcode-colorbox', // this class is used to fix some CSS issues with the colorbox
                                                                                            onaction: createColorPickAction()
                                                                                    },

                                                                                    // Custom Class
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'simpleMessageBoxCustomClass',
                                                                                            label: 'simpleMessageBoxCustomClassLabel',
                                                                                            value: '',
                                                                                            tooltip: 'simpleMessageBoxCustomClassTooltip'
                                                                                    } ],
                                                                                    onsubmit: function( e ) {
                                                                                            editor.insertContent('[message type="simple" bg_color="' + e.data.simpleMessageBoxBackgroundColor + '" color="' + e.data.simpleMessageBoxTextColor + '" class="' + e.data.simpleMessageBoxCustomClass + '"]' + e.data.simpleMessageBoxContent + '[/message]');
                                                                                    }
                                                                            });
                                                                    }
                                                            }, // End Simple Message Box
                                                            
                                                            
                                                        ]
                                                        
						}, // End Message Box

						/* Quotes Start */
						{
							text: 'quotesText',
                                                        menu: [
                                                            
                                                            /* Pullquote Start */
                                                            {
                                                                    text: 'pullquoteText',
                                                                    onclick: function() {
                                                                            editor.windowManager.open( {
                                                                                    title: 'pullquoteTitle',
                                                                                    body: [

                                                                                    // The Content
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'pullquoteContent',
                                                                                            label: 'pullquoteContentLabel',
                                                                                            value: "I am text block. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                                                                                            multiline: true,
                                                                                            minWidth: 270,
                                                                                            minHeight: 100
                                                                                    },

                                                                                    // Pullquote Symbol
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'pullquoteSymbol',
                                                                                            label: 'pullquoteSymbolLabel',
                                                                                            values: [
                                                                                                    {text: 'pullquoteSymbolValuesSymbol2', value: '2'},
                                                                                                    {text: 'pullquoteSymbolValuesSymbol1', value: ''}
                                                                                            ]
                                                                                    },

                                                                                    // Pullquote Style
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'pullquoteStyle',
                                                                                            label: 'pullquoteStyleLabel',
                                                                                            values: [
                                                                                                    {text: 'pullquoteStyleValuesDark', value: 'dark'},
                                                                                                    {text: 'pullquoteStyleValuesLight', value: 'light'}
                                                                                            ]
                                                                                    },

                                                                                    // Pullquote Alignment
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'pullquoteAlignment',
                                                                                            label: 'pullquoteAlignmentLabel',
                                                                                            values: [
                                                                                                    {text: 'pullquoteAlignmentValuesLeft', value: 'left'},
                                                                                                    {text: 'pullquoteAlignmentValuesRight', value: 'right'}
                                                                                            ]
                                                                                    } ],
                                                                                    onsubmit: function( e ) {
                                                                                            editor.insertContent( '[pullquote' + e.data.pullquoteSymbol + ' style="' + e.data.pullquoteAlignment + '" quote="' + e.data.pullquoteStyle + '"]' + e.data.pullquoteContent + '[/pullquote' + e.data.pullquoteSymbol + ']' );
                                                                                    }
                                                                            });
                                                                    }
                                                            }, // End Pullquote section
                                                            
                                                            /* Blockquote Start */
                                                            {
                                                                    text: 'blockquoteText',
                                                                    onclick: function() {
                                                                            editor.windowManager.open( {
                                                                                    title: 'blockquoteTitle',
                                                                                    body: [

                                                                                    // The Content
                                                                                    {
                                                                                            type: 'textbox',
                                                                                            name: 'blockquoteContent',
                                                                                            label: 'blockquoteContentLabel',
                                                                                            value: "I am text block. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                                                                                            multiline: true,
                                                                                            minWidth: 270,
                                                                                            minHeight: 100
                                                                                    },

                                                                                    // Quote Symbol
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'blockquoteSymbol',
                                                                                            label: 'blockquoteSymbolLabel',
                                                                                            values: [
                                                                                                    {text: 'blockquoteSymbolValuesSymbol2', value: '2'},
                                                                                                    {text: 'blockquoteSymbolValuesSymbol1', value: ''}
                                                                                            ]
                                                                                    },

                                                                                    // Quote Style
                                                                                    {
                                                                                            type: 'listbox',
                                                                                            name: 'blockquoteStyle',
                                                                                            label: 'blockquoteStyleLabel',
                                                                                            values: [
                                                                                                    {text: 'blockquoteStyleValuesDark', value: 'dark'},
                                                                                                    {text: 'blockquoteStyleValuesLight', value: 'light'}
                                                                                            ]
                                                                                    } ],
                                                                                    onsubmit: function( e ) {
                                                                                            var $blockquoteSymbol = ( '2' === e.data.blockquoteSymbol ) ? '-2': '',
                                                                                                $blockquoteClass = 'bq-' + e.data.blockquoteStyle + $blockquoteSymbol;
                                                                                            editor.insertContent( '<blockquote class="' + $blockquoteClass + '">' + e.data.blockquoteContent + '</blockquote>' );
                                                                                    }
                                                                            });
                                                                    }
                                                            }, // End Blockquote section
                                                            
                                                        ]
                                                        
						}, // End quotes section
                                                
						/* Recent Posts Start */
						{
							text: 'recentPostsText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'recentPostsTitle',
                                                                        width: 450,
                                                                        height: 600,
                                                                        autoScroll: true,
                                                                        //style: 'padding-right: 4px;',
									body: [
                                                                            
									// Title
									{
										type: 'textbox',
										name: 'recentPostsTitle',
										label: 'recentPostsTitleLabel',
										value: 'Latest from the Blog'
									},
                                                                        
									// Categories
                                                                        {
                                                                                type   : 'combobox',
										name: 'recentPostsCategories',
										label: 'recentPostsCategoriesLabel',
                                                                                'values': tinyMCE.activeEditor.settings.udesignCategoriesList,
                                                                                classes: 'u-design-shortcode-combobox', // this class is used to fix some CSS issues with the combobox
									},
                                                                        // Categories Field Description
                                                                        {
                                                                                type: 'label',
                                                                                name: 'recentPostsCategoriesDescription',
                                                                                multiline: true,
                                                                                style: 'color: #aeaeae; height: 75px;',
                                                                                text: "",
                                                                                onPostRender : function() {
                                                                                    this.getEl().innerHTML =
                                                                                        "<em>" + 'To choose a catetory use the little dropdown menu above.' + "</em><br />" +
                                                                                        "<em>" + 'For multiple categories enter comma-separated list of IDs.' + "</em><br />" +
                                                                                        "<em>" + 'To include all categories leave the field blank.' + "</em>";
                                                                                }
                                                                        },
                                                                        // Categories Field Description using tooltip
//                                                                        {
//                                                                                type   : 'tooltip',
//                                                                                name   : 'recentPostsCategoriesDescription',
//                                                                                label  : '',
//                                                                                style: 'height: 100px; width: 200px;',
//                                                                                text   : "To choose a catetory use the little dropdown menu above. For multiple categories enter comma-separated list of IDs. To choose all categories leave the field blank."
//                                                                        },
                                                                            
                                                                            
									// Number of posts to show
									{
										type: 'textbox',
										name: 'recentPostsNumberPostsToShow',
										label: 'recentPostsNumberPostsToShowLabel',
										value: '3',
                                                                                maxWidth: 40,
                                                                                tooltip: 'recentPostsNumberPostsToShowTooltip'
									},
                                                                            
									// Number of posts to skip
									{
										type: 'textbox',
										name: 'recentPostsNumberPostsToSkip',
										label: 'recentPostsNumberPostsToSkipLabel',
										value: '0',
                                                                                maxWidth: 40,
                                                                                tooltip: 'recentPostsNumberPostsToSkipTooltip'
									},
                                                                            
									// Number of words to show
									{
										type: 'textbox',
										name: 'recentPostsNumberWordsToShow',
										label: 'recentPostsNumberWordsToShowLabel',
										value: '23',
                                                                                maxWidth: 40,
                                                                                tooltip: 'recentPostsNumberWordsToShowTooltip'
									},

									// Date and author
									{
										type: 'listbox',
										name: 'recentPostsDateAndAuthor',
										label: 'recentPostsDateAndAuthorLabel',
										values: [
											{text: 'recentPostsDateAndAuthorValuesNo', value: '0'},
											{text: 'recentPostsDateAndAuthorValuesYes', value: '1'}
										]
									},

									// More link
									{
										type: 'listbox',
										name: 'recentPostsMoreLink',
										label: 'recentPostsMoreLinkLabel',
										values: [
											{text: 'recentPostsMoreLinkValuesNo', value: '0'},
											{text: 'recentPostsMoreLinkValuesYes', value: '1'}
										]
									},
                                                                            
									// "More" link text
									{
										type: 'textbox',
										name: 'recentPostsMoreLinkText',
										label: 'recentPostsMoreLinkTextLabel',
										value: 'Read more',
									},

									// Thumbnails
									{
										type: 'listbox',
										name: 'recentPostsShowThumbnails',
										label: 'recentPostsShowThumbnailsLabel',
										values: [
											{text: 'recentPostsShowThumbnailsValuesYes', value: '1'},
											{text: 'recentPostsShowThumbnailsValuesNo', value: '0'}
										]
									},

									// Thumbnail frame
									{
										type: 'listbox',
										name: 'recentPostsThumbnailFrame',
										label: 'recentPostsThumbnailFrameLabel',
										values: [ // the "no" and "yes" values below sould be oposites to reverse the original shortcode option which is asking to remove the thumb frame
											{text: 'recentPostsThumbnailFrameValuesNo', value: '1'},
											{text: 'recentPostsThumbnailFrameValuesYes', value: '0'}
										]
									},

									// Thumbnail shadow
									{
										type: 'listbox',
										name: 'recentPostsThumbnailShadow',
										label: 'recentPostsThumbnailShadowLabel',
										values: [
											{text: 'recentPostsThumbnailShadowValuesNo', value: '0'},
											{text: 'recentPostsThumbnailShadowValuesYes', value: '1'}
										]
									},

									// Default image
									{
										type: 'listbox',
										name: 'recentPostsDefaultImage',
										label: 'recentPostsDefaultImageLabel',
										values: [
											{text: 'recentPostsDefaultImageValuesYes', value: '1'},
                                                                                        {text: 'recentPostsDefaultImageValuesNo', value: '0'}
										],
										tooltip: 'recentPostsDefaultImageTooltip'
									},
                                                                            
									// Thumbnail width
									{
										type: 'textbox',
										name: 'recentPostsThumbnailWidth',
										label: 'recentPostsThumbnailWidthLabel',
										value: '60',
                                                                                maxWidth: 40,
                                                                                tooltip: 'recentPostsThumbnailWidthTooltip'
									},
                                                                            
									// Thumbnail height
									{
										type: 'textbox',
										name: 'recentPostsThumbnailHeight',
										label: 'recentPostsThumbnailHeightLabel',
										value: '60',
                                                                                maxWidth: 40,
                                                                                tooltip: 'recentPostsThumbnailHeightTooltip'
									}],
									onsubmit: function( e ) {
                                                                                editor.insertContent('[udesign_recent_posts title="' + e.data.recentPostsTitle + '" category_id="' + e.data.recentPostsCategories + '" num_posts="' + e.data.recentPostsNumberPostsToShow + '" post_offset="' + e.data.recentPostsNumberPostsToSkip + '" num_words_limit="' + e.data.recentPostsNumberWordsToShow + '" show_date_author="' + e.data.recentPostsDateAndAuthor + '" show_more_link="' + e.data.recentPostsMoreLink + '" more_link_text="' + e.data.recentPostsMoreLinkText + '" show_thumbs="' + e.data.recentPostsShowThumbnails + '" remove_thumb_frame="' + e.data.recentPostsThumbnailFrame + '" thumb_frame_shadow="' + e.data.recentPostsThumbnailShadow + '" default_thumb="' + e.data.recentPostsDefaultImage + '" post_thumb_width="' + e.data.recentPostsThumbnailWidth + '" post_thumb_height="' + e.data.recentPostsThumbnailHeight + '"]');
									}
								});
							}
						}, // End Recent Posts
                                                
						/* Accordion Start */
						{
							text: 'accordionText',
							onclick: function() {
								editor.insertContent('[accordion scroll_into_view="no"]<br />' +
                                                                                            '&nbsp;&nbsp;&nbsp;&nbsp;[accordion_toggle title="Title 1"]Content for accordion toggle 1 goes here...[/accordion_toggle]<br />' +
                                                                                            '&nbsp;&nbsp;&nbsp;&nbsp;[accordion_toggle title="Title 2"]Content for accordion toggle 2 goes here...[/accordion_toggle]<br />' +
                                                                                            '&nbsp;&nbsp;&nbsp;&nbsp;[accordion_toggle title="Title 3"]Content for accordion toggle 3 goes here...[/accordion_toggle]<br />' +
                                                                                     '[/accordion]');
							}
						}, // End accordion

						/* Toggle Start */
						{
							text: 'toggleText',
							onclick: function() {
								editor.insertContent('[toggle_content title="Toggle content title..."]Your content goes here...[/toggle_content]');
							}
						}, // End toggle

						/* Tabs Start */
						{
							text: 'tabsText',
							onclick: function() {
								editor.insertContent('[tabs]<br />' +
                                                                                            '&nbsp;&nbsp;&nbsp;&nbsp;[tab title="Tab 1"]Content for Tab 1 goes here...[/tab]<br />' +
                                                                                            '&nbsp;&nbsp;&nbsp;&nbsp;[tab title="Tab 2"]Content for Tab 2 goes here...[/tab]<br />' +
                                                                                            '&nbsp;&nbsp;&nbsp;&nbsp;[tab title="Tab 3"]Content for Tab 3 goes here...[/tab]<br />' +
                                                                                     '[/tabs]');
							}
						}, // End tabs

						/* List Styles Start */
						{
							text: 'listStylesText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'listStylesTitle',
									body: [

									// Bullets Style
									{
										type: 'listbox',
										name: 'listStyle',
										label: 'listStyleLabel',
										values: [
											{text: 'listStyleValuesList1', value: 'list-1'},
											{text: 'listStyleValuesList2', value: 'list-2'},
											{text: 'listStyleValuesList3', value: 'list-3'},
											{text: 'listStyleValuesList4', value: 'list-4'},
											{text: 'listStyleValuesList5', value: 'list-5'},
											{text: 'listStyleValuesList6', value: 'list-6'},
											{text: 'listStyleValuesList7', value: 'list-7'},
											{text: 'listStyleValuesList8', value: 'list-8'},
											{text: 'listStyleValuesList9', value: 'list-9'},
											{text: 'listStyleValuesList10', value: 'list-10'},
											{text: 'listStyleValuesList11', value: 'list-11'}
										]
									},

									// Bullets Content
									{
										type: 'textbox',
										name: 'listContent',
										label: 'listContentLabel',
										value: "<ul>\r\n\t<li>Your list item 1</li>\r\n\t<li>Your list item 2</li>\r\n\t<li>Your list item 3</li>\r\n</ul>",
										multiline: true,
										minWidth: 250,
										minHeight: 150
									} ],
									onsubmit: function( e ) {
										editor.insertContent('[custom_list style="' + e.data.listStyle + '"]' + e.data.listContent + '[/custom_list]');
									}
								});
							}
						}, // End list styles section

						/* Dropcap */
						{
							text: 'dropcapText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'dropcapTitle',
                                                                        width: 400,
                                                                        height: 100,
									body: [

									// Dropcap Content
									{
										type: 'textbox',
										name: 'dropcapContent',
										label: 'dropcapContentLabel',
                                                                                maxWidth: 100,
										value: "A",
                                                                                tooltip: 'dropcapContentTooltip'
									} ],
									onsubmit: function( e ) {
										editor.insertContent('[dropcap]' + e.data.dropcapContent + '[/dropcap]');
									}
								});
							}
						}, // End Dropcap

						/* Image Frame Start */
						{
							text: 'imageFrameText',
							onclick: function() {
								editor.windowManager.open( {
									title: 'imageFrameTitle',
									body: [

									// Image Alignment
									{
										type: 'listbox',
										name: 'imageAlignment',
										label: 'imageAlignmentLabel',
										values: [
											{text: 'imageAlignmentValuesLeft', value: 'left'},
											{text: 'imageAlignmentValuesRight', value: 'right'},
											{text: 'imageAlignmentValuesCenter', value: 'center'}
										]
									},

									// Frame Shadow
                                                                        {
                                                                                type   : 'checkbox',
                                                                                name   : 'imageFrameShadow',
                                                                                label  : 'imageFrameShadowLabel',
                                                                                text   : 'imageFrameShadowText',
                                                                                checked : false
                                                                        },
                                                                        
                                                                        // Image Upload
                                                                        {
                                                                                type: 'textbox',
                                                                                name: 'selectedImageHTML',
                                                                                label: 'selectedImageHTMLLabel',
                                                                                value: '',
                                                                                multiline: true,
										minWidth: 250,
										minHeight: 150,
                                                                                classes: 'u-design-shortcodes-input-image-html'
                                                                        },
                                                                        {
                                                                                type: 'button',
                                                                                name: 'imageFrameUploadButton',
                                                                                label: ' ',
                                                                                text: 'imageFrameUploadButtonText',
                                                                                classes: 'upload-button-for-image-html'
                                                                        } ],
                                                                    
									onsubmit: function( e ) {
                                                                                var $imageFrameShadow = ( true === e.data.imageFrameShadow ) ? 'on' : 'off';
                                                                                editor.insertContent('[custom_frame_' + e.data.imageAlignment + ' shadow="' + $imageFrameShadow + '"]' + e.data.selectedImageHTML + '[/custom_frame_' + e.data.imageAlignment + ']');
									}
								});
							}
						}, // End Image Frame

						/* Custom Table Start */
						{
							text: 'customTableText',
							onclick: function() {
                                                            var $sampleTable = '<table summary="Sample Table">' +
                                                                                    '<thead>' +
                                                                                        '<tr>' +
                                                                                            '<th scope="col">Header 1</th>' +
                                                                                            '<th scope="col">Header 2</th>' +
                                                                                            '<th scope="col">Header 3</th>' +
                                                                                            '<th scope="col">Header 4</th>' +
                                                                                        '</tr>' +
                                                                                    '</thead>' +
                                                                                    '<tbody>' +
                                                                                        '<tr>' +
                                                                                            '<td>Item 1</td>' +
                                                                                            '<td>Description</td>' +
                                                                                            '<td>Subtotal:</td>' +
                                                                                            '<td>$0.00</td>' +
                                                                                        '</tr>' +
                                                                                        '<tr>' +
                                                                                            '<td>Item 2</td>' +
                                                                                            '<td>Description</td>' +
                                                                                            '<td>Discount:</td>' +
                                                                                            '<td>$0.00</td>' +
                                                                                        '</tr>' +
                                                                                        '<tr>' +
                                                                                            '<td>Item 3</td>' +
                                                                                            '<td>Description</td>' +
                                                                                            '<td>Shipping:</td>' +
                                                                                            '<td>$0.00</td>' +
                                                                                       '</tr>' +
                                                                                       '<tr>' +
                                                                                            '<td>Item 4</td>' +
                                                                                            '<td>Description</td>' +
                                                                                            '<td>Tax:</td>' +
                                                                                            '<td>$0.00</td>' +
                                                                                        '</tr>' +
                                                                                        '<tr>' +
                                                                                            '<td>Item 1:</td>' +
                                                                                            '<td>Description</td>' +
                                                                                            '<td><strong>TOTAL:</strong></td>' +
                                                                                            '<td><strong>$0.00</strong></td>' +
                                                                                        '</tr>' +
                                                                                    '</tbody>' +
                                                                                    '<tfoot>' +
                                                                                        '<tr>' +
                                                                                            '<td colspan="4">' +
                                                                                                '*Table Footer here...' +
                                                                                            '</td>' +
                                                                                        '</tr>' +
                                                                                    '</tfoot>' +
                                                                                '</table>';
                                                                editor.insertContent('[custom_table]' + $sampleTable + '[/custom_table]');
							}
						}, // End Custom Table


					]
				}, // End Content section


				/** Other Start **/
				{
                                        text: 'otherText',
                                        icon: 'icon dashicons-art',
                                        menu: [

                                                /* Email Obfuscation */
                                                {
                                                        text: 'emailObfuscationText',
                                                        onclick: function() {
                                                                        editor.windowManager.open( {
                                                                                title: 'emailObfuscationTitle',
                                                                                width: 500,
                                                                                height: 100,
                                                                                body: [

                                                                                // Email Address
                                                                                {
                                                                                        type: 'textbox',
                                                                                        name: 'emailAdress',
                                                                                        label: 'emailAdressLabel',
                                                                                        value: 'john.doe@example.com'
                                                                                } ],
                                                                                onsubmit: function( e ) {
                                                                                        editor.insertContent('[safe_email]' + e.data.emailAdress + '[/safe_email]');
                                                                                }
                                                                        });

                                                        }
                                                } // End Email Obfuscation

					]
				} // End Other section

			]
		});
                
                /** Start Miscellaneous Functions **/
                // Taken from core plugins
                var editor = tinymce.activeEditor;
                function createColorPickAction() {
                    var colorPickerCallback = editor.settings.color_picker_callback;
                    if ( colorPickerCallback ) {
                        return function() {
                            var self = this;
                            colorPickerCallback.call(
                                    editor,
                                    function( value ) {
                                            self.value( value ).fire( 'change' );
                                    },
                                    self.value()
                            );
                        };
                    }
                } // End createColorPickAction Function
                
                
	});
})();




jQuery( document ).ready( function( $ ){
        /**
         * Get a WP Media library image URL by accessing WP Media library from tinymce plugin popup window
         * 
         */
        $( document ).on( 'click', '.mce-upload-button-for-image-url', select_image_url_tinymce );
        function select_image_url_tinymce( e ) {
            var $el = $(this);
            e.preventDefault();
            var $input_field = $( '.mce-u-design-shortcodes-input-image-url' );
            var custom_uploader = wp.media.frames.file_frame = wp.media({
                title: $el.data('choose'),
                button: {
                    text: $el.data('choose'),
                },
                multiple: false
            });
            custom_uploader.on( 'select', function() {
                var attachment = custom_uploader.state().get( 'selection' ).first().toJSON();
                $input_field.val( attachment.url );
            });
            custom_uploader.open();
        }
        
        
        /**
         * Get a WP Media library image HTML by accessing WP Media library from tinymce plugin popup window
         * 
         */
        $( document ).on( 'click', '.mce-upload-button-for-image-html', select_image_html_tinymce );
        function select_image_html_tinymce( e ) {
            var $el = $(this);
            e.preventDefault();
            var $input_field = $( '.mce-u-design-shortcodes-input-image-html' );
            var custom_uploader = wp.media.frames.file_frame = wp.media({
                title: $el.data('choose'),
                button: {
                    text: $el.data('choose'),
                },
                multiple: false
            });
            custom_uploader.on( 'select', function() {
                var attachment = custom_uploader.state().get( 'selection' ).first().toJSON();
                var html = '<img src="' + attachment.url + '" alt="' + attachment.alt + '" title="' + attachment.title + '" />';
                $input_field.val( html );
            });
            custom_uploader.open();
        }
        
        
        
});

