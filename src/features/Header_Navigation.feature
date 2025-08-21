@header @regression
Feature:  ShareValue Header navigation

    Background: Pre condition
        Given I navigate to the ShareValue homepage


    Scenario:
        Then In the main menu there is a ShareValue logo
        When I click on the logo
        Then The page title is 'Tijdelijk extra IT-experts nodig?'


    Scenario Outline: The main menu is visable on the page
        When I click on the '<menuItem>' in the header
        # Then I wait for 3 seconds
        # Then The page title is '<pageTitle>'

        Examples:
            | menuItem          | pageUrl           | pageTitle                        |
            | Wat we doen       | wat-we-doen       | Wat we doen                      |
            | Kennisbank        | kennisbank        | Wat speelt er nu bij ShareValue? |
            | Word onze collega | word-onze-collega | Kom je bij ons werken?           |
            | Contact           | contact           | Contact                          |

    Scenario: "Wat we doen" shows the correct submenu items
        When I hover over the "Wat we doen" menu item
        Then I should see the following submenu items:
            | label           | url                         |
            | Onze aanpak     | /onze-aanpak                |
            | Microsoft Azure | /wat-we-doen/azure          |
            | Microsoft 365   | /wat-we-doen/microsoft-365  |
            | Power Platform  | /wat-we-doen/power-platform |
            | Development     | /wat-we-doen/development    |

    Scenario: "Kennisbank" shows the correct submenu items
        When I hover over the "Kennisbank" menu item
        Then I should see the following submenu items:
            | label       | url                    |
            | Alle        | /kennisbank            |
            | Nieuws      | /kennisbank/nieuws     |
            | Blogs       | /kennisbank/blogs      |
            | Evenementen | /kennisbank/events     |
            | Klantcases  | /kennisbank/klantcases |

    Scenario: "Word onze collega" shows the correct submenu items
        When I hover over the "Word onze collega" menu item
        Then I should see the following submenu items:
            | label                | url                                     |
            | Vacatures            | /word-onze-collega/vacatures            |
            | Memberships          | /word-onze-collega/memberships          |
            # | Collega's aan het woord | /word-onze-collega/collegas-aan-het-woord |
            | Ontmoet onze experts | /word-onze-collega/ontmoet-onze-experts |
            | Stage lopen          | /word-onze-collega/stagelopen           |

    Scenario: "Contact" shows the correct submenu items
        When I hover over the "Contact" menu item
        Then I should see the following submenu items:
            | label               | url                  |
            | Zakenvriend van KWF | /zakenvriend-van-kwf |


    Scenario: Clicking the hamburger icon reveals the navigation menu
        When I click on the hamburger menu in the header
        Then I wil have "6" menu header items
        Then I Expect that i can close the menu by pressing the close button
