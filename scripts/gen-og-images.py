import os
from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FONT_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"

def create_og_image(output_path, title_lines, subtitle, tag, screenshot_path=None, is_mobile=True):
    width, height = 1200, 630
    img = Image.new("RGBA", (width, height), (248, 250, 252, 255)) # #F8FAFC
    draw = ImageDraw.Draw(img)

    # 1. Subtle radial wash in top right
    wash = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    wash_draw = ImageDraw.Draw(wash)
    wash_draw.ellipse([700, -100, 1400, 500], fill=(37, 99, 235, 12)) # ~5% blue wash
    img = Image.alpha_composite(img, wash)
    draw = ImageDraw.Draw(img)

    # Hairline border around the whole image
    draw.rectangle([0, 0, width - 1, height - 1], outline=(226, 232, 240, 255), width=2)

    # Fonts
    font_badge = ImageFont.truetype(FONT_MONO, 14)
    font_title = ImageFont.truetype(FONT_BOLD, 46)
    font_sub = ImageFont.truetype(FONT_REGULAR, 20)
    font_footer = ImageFont.truetype(FONT_REGULAR, 15)

    # Top Pill / Badge
    draw.rounded_rectangle([72, 60, 240, 92], radius=16, fill=(233, 239, 248, 255), outline=(226, 232, 240, 255))
    draw.ellipse([88, 73, 94, 79], fill=(37, 99, 235, 255))
    draw.text((106, 68), tag, font=font_badge, fill=(30, 41, 59, 255))

    # Title Lines
    y_text = 130
    for line in title_lines:
        draw.text((72, y_text), line, font=font_title, fill=(30, 41, 59, 255))
        y_text += 58

    # Subtitle
    y_text += 10
    draw.text((72, y_text), subtitle, font=font_sub, fill=(71, 85, 105, 255))

    # Bottom Footer
    draw.line([72, 540, 1128, 540], fill=(226, 232, 240, 255), width=1)
    draw.text((72, 560), "SARTHAK — PORTFOLIO", font=font_badge, fill=(100, 116, 139, 255))
    draw.text((1128 - 250, 560), "ANDROID · IOS · LINUX · WEB", font=font_badge, fill=(100, 116, 139, 255))

    # Screenshot Mockup on Right Side
    if screenshot_path and os.path.exists(screenshot_path):
        try:
            screen = Image.open(screenshot_path).convert("RGBA")
            if is_mobile:
                # Phone mockup
                phone_w, phone_h = 240, 480
                phone_x, phone_y = 860, 50
                screen = screen.resize((phone_w - 16, phone_h - 16), Image.Resampling.LANCZOS)
                
                # Phone outer frame
                draw.rounded_rectangle([phone_x, phone_y, phone_x + phone_w, phone_y + phone_h], radius=36, fill=(15, 23, 42, 255), outline=(51, 65, 85, 255), width=2)
                # Paste screen
                img.paste(screen, (phone_x + 8, phone_y + 8))
                # Notch
                draw.rounded_rectangle([phone_x + 70, phone_y + 12, phone_x + phone_w - 70, phone_y + 24], radius=6, fill=(0, 0, 0, 255))
            else:
                # Desktop browser mockup
                desk_w, desk_h = 440, 280
                desk_x, desk_y = 690, 150
                
                draw.rounded_rectangle([desk_x, desk_y, desk_x + desk_w, desk_y + desk_h], radius=14, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)
                # Header bar
                draw.rounded_rectangle([desk_x, desk_y, desk_x + desk_w, desk_y + 28], radius=14, fill=(241, 245, 249, 255))
                draw.ellipse([desk_x + 12, desk_y + 9, desk_x + 22, desk_y + 19], fill=(203, 213, 225, 255))
                draw.ellipse([desk_x + 28, desk_y + 9, desk_x + 38, desk_y + 19], fill=(203, 213, 225, 255))
                draw.ellipse([desk_x + 44, desk_y + 9, desk_x + 54, desk_y + 19], fill=(203, 213, 225, 255))
                
                screen = screen.resize((desk_w - 4, desk_h - 32), Image.Resampling.LANCZOS)
                img.paste(screen, (desk_x + 2, desk_y + 30))
        except Exception as e:
            print(f"Error embedding screenshot: {e}")

    # Convert to RGB and save
    final_img = img.convert("RGB")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    final_img.save(output_path, "PNG", optimize=True)
    print(f"Saved: {output_path}")

if __name__ == "__main__":
    # Main OG
    create_og_image(
        "public/og.png",
        ["I build and ship real apps:", "Android, iOS, Linux and web."],
        "Softify, Ludo and StudyStack are live, downloadable and tested.",
        "SOLO BUILDER, 16",
        "public/projects/softify/01_homepage.png",
        is_mobile=True
    )

    # Softify OG
    create_og_image(
        "public/projects/softify/og.png",
        ["Softify", "On-Device Audio Player"],
        "Clean Architecture, SQLite FTS5 search & zero telemetry.",
        "LIVE APP",
        "public/projects/softify/01_homepage.png",
        is_mobile=True
    )

    # Ludo OG
    create_og_image(
        "public/projects/ludo/og.png",
        ["Ludo with Friends", "Multiplayer Board Game"],
        "Firestore real-time listeners and multi-platform packages.",
        "LIVE APP",
        "public/projects/ludo/demo-board.png",
        is_mobile=False
    )

    # StudyStack OG
    create_og_image(
        "public/projects/studystack/og.png",
        ["StudyStack", "Academic Planning Engine"],
        "Ratio-interval priority scoring with 455 passing tests.",
        "IN PROGRESS",
        "public/projects/studystack/dashboard.png",
        is_mobile=False
    )
