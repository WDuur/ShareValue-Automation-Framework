@regression
Feature: Homepage

    Background: Pre condition
        Given I navigate to the ShareValue homepage

    Scenario: Check homepage hero slider
        Then I see a slider on the page as a hero image
        Then The "hero" image should have exactly "2" slides
        When I click on every bullet at the "hero" images
        Then The corresponding slide is active

    Scenario: On the homepage there is a introduction text
        Then I should see a header with the text "ShareValue, de standaard voorbij"
        And I should see a paragraph containing the description about the "intro" segment

    Scenario: On the homepage the ShareValue expertises are visable
        Then I see the "expertise" segment on the homepage
        And The "expertise" segment has "Onze expertises" as "title"
        And The "expertise" segment has "expertises" as "label"
        Then There is one "expertise" block for "Azure"
        And There is one "expertise" block for "Microsoft 365"
        And There is one "expertise" block for "Power Platform"
        And There is one "expertise" block for "Development"

    Scenario: On the homepage the is a explanation about ShareValue partners
        Then I see the "partner" segment on the homepage
        And The "partner" segment has "Een betrouwbare partner" as "title"
        And I should see a paragraph containing the description about the "partner" segment
        And This "partner" segment has "2" images

    Scenario: On the homepage there is a banner about us
        Then I see the "banner" segment on the homepage
        And The "banner" segment has "ShareValue - De standaard voorbij" as "title"
        And On the "banner" is a cta with a link to "over-ons"

    Scenario: On the homepage there is a segment how ShareValue works
        Then I see the "work" segment on the homepage
        And The "work" segment has "Zo werkt ShareValue" as "title"
        And There are "6" blocks to explain how we "work" with a image, title and paragraph

    Scenario Outline: On the homepage there is an overview with all clients
        Then I see the "clients" segment on the homepage
        And The "clients" segment has "Onze opdrachtgevers" as "title"
        And I should see a paragraph containing the description about the "clients" segment
        And This "clients" segment has "9" images
        And There is a client logo for '<clientName>'

        Examples:
            | clientName                   |
            | roveg                        |
            | QSN                          |
            | Provincie Utrecht            |
            | Stork                        |
            | Rovict                       |
            | NTI                          |
            | dbf                          |
            | WWF                          |
            | Stichting Inlichtingenbureau |


    Scenario: On the homepage there are rotating quotes
        Then I see the "quotes" segment on the homepage
        Then The "quotes" image should have exactly "5" slides
        When I click on every bullet at the "quotes" images
        Then The corresponding slide is active
    @dev
    Scenario: On the homepage are the latest blogposts
        Then I see the "blogposts" segment on the homepage
        And The "blogposts" segment has "Wat speelt er bij ShareValue?" as "title"
        And The "blogposts" segment has "Onze updates" as "label"
        And The "6" latest "blogposts" where correctly showen

