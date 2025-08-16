@regression @dev
Feature: Cookie banner interaction

    Background: Pre condition
        Given I navigate to the ShareValue homepage
        When All cookies are cleared
        Then The cookie banner should be visible

    Scenario: User accepts cookies
        When The user clicks the "Accepteren" button
        Then The cookie banner should not be visible
        And The "cookieConsent" cookie should be set to "true"

    Scenario: User dont accepts cookies
        When The user clicks the "Weigeren" button
        Then The cookie banner should not be visible
        And The "cookieConsent" cookie should be set to "false"

    Scenario: User wants to manage cookies
        When The user clicks the "Cookies beheren" link
        Then The cookie settings should be shown
        When The user clicks the checkbox to accept the cookies
        And The user clicks the "Bevestigen" button
        Then The "cookieConsent" cookie should be set to "true"