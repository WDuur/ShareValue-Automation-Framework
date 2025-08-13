@sv @header
Feature:  ShareValue Header navigation

    Background: Pre condition
        Given I navigate to the ShareValue homepage


    Scenario:
        Then In the main menu there is a SharValue logo
        When I click on the logo
        Then The page title is 'Tijdelijk extra IT-experts nodig?'

    Scenario Outline: The main menu is visable on the page
        When I click on the '<menuItem>' in the header
        Then The page title is '<pageTitle>'

        Examples:
            | menuItem          | pageUrl           | pageTitle                        |
            | Wat we doen       | wat-we-doen       | Wat we doen                      |
            | Kennisbank        | kennisbank        | Wat speelt er nu bij ShareValue? |
            | Word onze collega | word-onze-collega | Kom je bij ons werken?           |
            | Contact           | contact           | Neem contact op                  |