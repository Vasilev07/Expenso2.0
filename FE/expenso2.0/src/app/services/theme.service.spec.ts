import { RendererFactory2 } from "@angular/core";
import { ThemeService } from "./theme.service";

describe('ThemeService', () => {
    let sut: ThemeService;
    let rendererFactory: RendererFactory2;
    let document: Document;

    beforeEach(() => {
        rendererFactory = {
            createRenderer: jest.fn(() => ({
                addClass: jest.fn(),
                removeClass: jest.fn()
            })),

        } as any;

        document = {
            body: {},
        } as any;

        sut = new ThemeService(rendererFactory, document);
    });

    describe('enableDarkMode()', () => {
        it('should call renderer.addClass()', () => {
            sut.enableDarkMode();

            expect(sut.renderer.addClass).toHaveBeenCalled();
        });
    });

    describe('enableLightMode()', () => {
        it('should call renderer.removeClass()', () => {
            sut.enableLightMode();

            expect(sut.renderer.removeClass).toHaveBeenCalled();
        });
    });
});
