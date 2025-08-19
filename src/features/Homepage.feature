@regression @dev
Feature: Homepage

    Background: Pre condition
        Given I navigate to the ShareValue homepage

    Scenario: Check homepage hero slider
        Then I see a slider on the page as a hero image
        Then The hero image should have exactly "2" slides
        When I click on every bullet at the hero image
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