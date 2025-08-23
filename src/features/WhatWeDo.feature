@regression  @dev
Feature: Wat we doen page

    Background: Pre condition
        Given I navigate to the wat we doen page

    Scenario: The is a Hero on this page
        Then I see a image on the page as a hero
        And The hero has a title "Wat we doen"

    Scenario: On the what we do page there is a introduction text
        Then I should see "Persoonlijk en op maat" as the "first" paragraph header
        And I should see "Onze aanpak" as the "second" paragraph header
        And I should see "Onze expertises" as the "third" paragraph header
        Then There is one clickable expertise block for "Azure"
        And There is one clickable expertise block for "Microsoft 365"
        And There is one clickable expertise block for "Power Platform"
        And There is one clickable expertise block for "Development"
        Then I should see "Teams Store - a ShareValue Brand" as the "fourth" paragraph header

    Scenario: On what we do page there are rotating quotes
        Then I see the "quotes" segment on the page
        Then The "quotes" image should have exactly "9" slides
        When I click on every bullet at the "quotes" images
        Then The corresponding slide is active

    Scenario: On what we do page there is a rotation contact persons carousel
        Then I see the "persons" segment on the page
        Then The "persons" image should have exactly "2" slides
        When I click on every bullet at the "persons" images
        Then The corresponding slide is active

    Scenario: On the homeWhat we do page is a double call to acton
        Then I see the "cta" segment on the homepage
        And The "cta" wil have "2" call to actions
        Then I can click on the "Lees hier onze klantcases" button
        Then I can click on the "Neem contact met ons op" button