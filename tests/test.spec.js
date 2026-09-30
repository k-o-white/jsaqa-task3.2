import { test, expect } from "@playwright/test";
const { chromium } = require("playwright");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} = require("../user.js");

test("Succesful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator('[data-testid="advanced-iframe"]').contentFrame().getByTestId('silhouette-container')).toBeVisible();
});

test("Unsuccesful authorization", async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByText('Другие способы входа').click();
  await page.getByText('Войти по почте').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(incorrectEmail);
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill(incorrectPassword);
  await page.getByTestId('login-submit-btn').click();
  await expect(page.getByText('Неверный email')).toBeVisible();
});