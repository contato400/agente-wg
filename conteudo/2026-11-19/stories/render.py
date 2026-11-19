import asyncio,sys
from playwright.async_api import async_playwright
D='/home/claude/agente-wg/conteudo/2026-11-19/stories/'
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+D+'_src/stories.html'); await pg.wait_for_timeout(800)
        for i in range(1,5):
            await pg.locator(f'#s{i}').screenshot(path=D+f'0{i}.jpg',type='jpeg',quality=93)
        await b.close()
asyncio.run(m())
