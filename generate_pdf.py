import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#71717A"))
        
        # Header (pages after 1)
        if self._pageNumber > 1:
            self.drawString(36, 11 * inch - 30, "GOUKI PORTFOLIO — Case Studies & Project Documentation")
            self.setStrokeColor(colors.HexColor("#E4E4E7"))
            self.setLineWidth(0.5)
            self.line(36, 11 * inch - 34, 8.5 * inch - 36, 11 * inch - 34)
            
        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 36, 25, footer_text)
        self.drawString(36, 25, "Gouki Portfolio © 2026 | UI/UX Designer & Full-Stack Developer")
        self.setStrokeColor(colors.HexColor("#E4E4E7"))
        self.setLineWidth(0.5)
        self.line(36, 35, 8.5 * inch - 36, 35)
        
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=44,
        bottomMargin=44,
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Styles
    primary_color = colors.HexColor("#09090B")
    accent_navy = colors.HexColor("#0F2B5C") # Navy blue accent
    text_dark = colors.HexColor("#18181B")
    text_muted = colors.HexColor("#52525B")
    border_color = colors.HexColor("#E4E4E7")
    card_bg = colors.HexColor("#F8FAFC")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=4,
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=accent_red,
        spaceAfter=12,
        textTransform='uppercase',
    )
    
    intro_style = ParagraphStyle(
        'IntroText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=text_muted,
        spaceAfter=14,
    )
    
    section_h1 = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=primary_color,
        spaceBefore=14,
        spaceAfter=8,
    )
    
    proj_title_style = ParagraphStyle(
        'ProjTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=17,
        textColor=primary_color,
    )
    
    proj_tag_style = ParagraphStyle(
        'ProjTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=accent_red,
        alignment=2, # right
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=text_dark,
    )
    
    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=text_muted,
        textTransform='uppercase',
    )
    
    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_dark,
    )
    
    step_num = ParagraphStyle(
        'StepNum',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=accent_red,
    )
    
    step_title = ParagraphStyle(
        'StepTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=primary_color,
    )
    
    step_desc = ParagraphStyle(
        'StepDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=text_muted,
    )
    
    badge_style = ParagraphStyle(
        'BadgeStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#0284C7"),
    )

    story = []
    
    # ── HEADER ──
    story.append(Paragraph("ANIZ WIZ GOUKI (HMYAT)", title_style))
    story.append(Paragraph("UI/UX Designer &amp; Full-Stack Developer — Portfolio Projects Documentation", subtitle_style))
    story.append(Paragraph(
        "A curated overview of end-to-end design and engineering projects — spanning Design Thinking, high-fidelity Figma user flows and design systems, production React frontend implementation, scalable cloud infrastructure (Supabase, Render), real-time WebSockets, and active cross-platform mobile app expansion.",
        intro_style
    ))
    
    # Links header table
    links_data = [
        [
            Paragraph("<b>Portfolio:</b> <a href='https://hmyat3366-ai.github.io/anizwizgouki/' color='#881337'><u>Live Portfolio Site</u></a>", body_style),
            Paragraph("<b>GitHub:</b> <a href='https://github.com/hmyat3366-ai' color='#881337'><u>github.com/hmyat3366-ai</u></a>", body_style),
            Paragraph("<b>Focus:</b> Design-to-Code &amp; Full-Stack SaaS", body_style),
        ]
    ]
    links_table = Table(links_data, colWidths=[2.2 * inch, 2.5 * inch, 2.8 * inch])
    links_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(links_table)
    story.append(Spacer(1, 14))
    
    # ── SUMMARY TABLE ──
    story.append(Paragraph("Executive Projects Summary", section_h1))
    summary_headers = [
        Paragraph("<b>Project</b>", meta_label),
        Paragraph("<b>Category</b>", meta_label),
        Paragraph("<b>Timeline / Role</b>", meta_label),
        Paragraph("<b>Live Website</b>", meta_label),
        Paragraph("<b>Figma Source</b>", meta_label),
    ]
    summary_rows = [
        summary_headers,
        [
            Paragraph("<b>Xia Chat</b>", body_style),
            Paragraph("SaaS OmniChannel", meta_val),
            Paragraph("July 2026 – Ongoing<br/>UI/UX &amp; Full-Stack", meta_val),
            Paragraph("<a href='https://xiachatv3.vercel.app/' color='#881337'><u>Launch Live</u></a>", meta_val),
            Paragraph("<a href='https://www.figma.com/design/KyE1Pqiyzc8ucg3clMAhiw/Untitled?node-id=0-1&p=f&t=G8nm1Dmbw8JCeOoD-0' color='#881337'><u>Figma File</u></a>", meta_val),
        ],
        [
            Paragraph("<b>Skyline Agency</b>", body_style),
            Paragraph("Digital Agency", meta_val),
            Paragraph("May 2026 (3 Wks)<br/>Visual Identity &amp; Dev", meta_val),
            Paragraph("<a href='https://skylineagc.vercel.app/' color='#881337'><u>Launch Live</u></a>", meta_val),
            Paragraph("<a href='https://www.figma.com/design/Ut2PAlntXyzo3ARE5Vdfiz/SkyLine?node-id=3311-2&p=f&t=BQVu8MNRAkkaHTwG-0' color='#881337'><u>Figma File</u></a>", meta_val),
        ],
        [
            Paragraph("<b>DMAR App</b>", body_style),
            Paragraph("Community Platform", meta_val),
            Paragraph("Apr 2026 (6 Wks)<br/>Data Viz &amp; System", meta_val),
            Paragraph("<a href='https://dmars.vercel.app/' color='#881337'><u>Launch Live</u></a>", meta_val),
            Paragraph("<a href='https://www.figma.com/design/yVENJJHh1wcJb0jq5xVu1F/DMAR-web-view-and-Mobile-view?node-id=4102-259&p=f&t=BQVu8MNRAkkaHTwG-0' color='#881337'><u>Figma File</u></a>", meta_val),
        ],
        [
            Paragraph("<b>Aura Real Estate</b>", body_style),
            Paragraph("Luxury Real Estate", meta_val),
            Paragraph("Dec 2025 (4 Wks)<br/>Research &amp; Frontend", meta_val),
            Paragraph("<a href='https://aurarealestate.vercel.app/' color='#881337'><u>Launch Live</u></a>", meta_val),
            Paragraph("<a href='https://www.figma.com/design/gBHrwJxQIJzzFy1iCgE4PI/real-estate?node-id=0-1&p=f&t=BQVu8MNRAkkaHTwG-0' color='#881337'><u>Figma File</u></a>", meta_val),
        ],
    ]
    sum_table = Table(summary_rows, colWidths=[1.4*inch, 1.4*inch, 1.6*inch, 1.4*inch, 1.7*inch])
    sum_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(sum_table)
    story.append(Spacer(1, 14))
    
    # ── PROJECT 1: XIA CHAT ──
    p1_elements = []
    p1_header = Table([
        [
            Paragraph("<b>01. XIA CHAT</b> — AI-Assisted Customer Support SaaS", proj_title_style),
            Paragraph("<b>SAAS OMNICHANNEL • 2026 JULY</b>", proj_tag_style)
        ]
    ], colWidths=[5.4*inch, 2.1*inch])
    p1_header.setStyle(TableStyle([
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    p1_elements.append(p1_header)
    p1_elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#06B6D4"), spaceAfter=8))
    
    p1_overview = (
        "Xia Chat is a comprehensive omnichannel customer support SaaS platform designed and engineered from the ground up to "
        "unify website visitor engagement, automated AI assistance, and real-time live agent support in a single workspace.<br/><br/>"
        "<b>Links:</b> Live Site: <a href='https://xiachatv3.vercel.app/' color='#881337'><u>https://xiachatv3.vercel.app/</u></a> &nbsp;|&nbsp; "
        "Figma Workspace: <a href='https://www.figma.com/design/KyE1Pqiyzc8ucg3clMAhiw/Untitled?node-id=0-1&p=f&t=G8nm1Dmbw8JCeOoD-0' color='#881337'><u>View Figma File</u></a><br/>"
        "<b>Tech Stack:</b> Figma, React, Next.js, TypeScript, Tailwind CSS, React Native, Supabase, Render, Node.js, Express, Socket.IO, Stripe, Vercel, Antigravity AI"
    )
    p1_elements.append(Paragraph(p1_overview, body_style))
    p1_elements.append(Spacer(1, 6))
    
    # Figma & Code Details Table
    f_c_data = [
        [
            Paragraph("<b>Figma UI/UX &amp; State Architecture</b>", ParagraphStyle('SubHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.HexColor("#0F172A"))),
            Paragraph("<b>Full-Stack Engineering &amp; Architecture</b>", ParagraphStyle('SubHeader2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.HexColor("#0F172A")))
        ],
        [
            Paragraph(
                "&bull; <b>User Flows &amp; State Mapping:</b> Comprehensive user journeys, conversation life cycles, visitor tracking, and real-time agent handoff states.<br/>"
                "&bull; <b>High-Fidelity Design System:</b> Scalable component library for both admin dashboard and floating customer chat widget with responsive tokens.<br/>"
                "&bull; <b>Interaction Prototyping:</b> Typing indicators, online badges, lead capture modals, and dynamic message statuses.",
                step_desc
            ),
            Paragraph(
                "&bull; <b>Pixel-Perfect Frontend:</b> Translated Figma UI into production React/Next.js components with 1:1 pixel parity &amp; embeddable script.<br/>"
                "&bull; <b>Supabase &amp; Render Cloud:</b> Relational database with Row-Level Security, real-time subscriptions, and Express API on Render.<br/>"
                "&bull; <b>WebSockets &amp; Payments:</b> Bidirectional Socket.IO messaging, Stripe billing, Google OAuth, and zero-downtime CI/CD.",
                step_desc
            )
        ]
    ]
    f_c_table = Table(f_c_data, colWidths=[3.7*inch, 3.8*inch])
    f_c_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    p1_elements.append(f_c_table)
    p1_elements.append(Spacer(1, 6))
    
    # Active Milestone Card
    milestone_p = Paragraph(
        "<b>[IN ACTIVE DEVELOPMENT] Mobile App Expansion (iOS &amp; Android):</b><br/>"
        "Currently engineering dedicated cross-platform mobile apps with <b>React Native &amp; Supabase Realtime</b>. Enables support agents to receive instant background push notifications, handle visitor queries on-the-go, and sync inbox conversations with zero latency.",
        ParagraphStyle('Milestone', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11.5, textColor=colors.HexColor("#0369A1"))
    )
    m_table = Table([[milestone_p]], colWidths=[7.5*inch])
    m_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0F9FF")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#38BDF8")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    p1_elements.append(m_table)
    story.append(KeepTogether(p1_elements))
    story.append(Spacer(1, 14))
    
    # ── PROJECT 2: SKYLINE AGENCY ──
    p2_elements = []
    p2_header = Table([
        [
            Paragraph("<b>02. SKYLINE AGENCY</b> — Bold Brutalist Agency Portfolio", proj_title_style),
            Paragraph("<b>DIGITAL AGENCY • 2026 MAY</b>", proj_tag_style)
        ]
    ], colWidths=[5.4*inch, 2.1*inch])
    p2_header.setStyle(TableStyle([
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    p2_elements.append(p2_header)
    p2_elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#FF3366"), spaceAfter=8))
    
    p2_body = (
        "A playground for unconventional web design, pushing brutalist aesthetics with oversized typography, neon accents, "
        "and complex scroll-triggered interactions.<br/>"
        "&bull; <b>Live Website:</b> <a href='https://skylineagc.vercel.app/' color='#881337'><u>https://skylineagc.vercel.app/</u></a> &nbsp;|&nbsp; "
        "<b>Figma File:</b> <a href='https://www.figma.com/design/Ut2PAlntXyzo3ARE5Vdfiz/SkyLine?node-id=3311-2&p=f&t=BQVu8MNRAkkaHTwG-0' color='#881337'><u>View on Figma</u></a><br/>"
        "&bull; <b>Key Techniques:</b> GSAP ScrollTrigger section pinning, infinite looping marquee math, strict CSS performance tuning, and high-contrast brutalist color palettes.<br/>"
        "&bull; <b>Tools:</b> React, GSAP, Tailwind CSS, Antigravity AI, Figma."
    )
    p2_elements.append(Paragraph(p2_body, body_style))
    story.append(KeepTogether(p2_elements))
    story.append(Spacer(1, 14))
    
    # ── PROJECT 3: DMAR APP ──
    p3_elements = []
    p3_header = Table([
        [
            Paragraph("<b>03. DMAR APP</b> — Financial Dashboard &amp; Mascot Branding", proj_title_style),
            Paragraph("<b>COMMUNITY PLATFORM • 2026 APRIL</b>", proj_tag_style)
        ]
    ], colWidths=[5.4*inch, 2.1*inch])
    p3_header.setStyle(TableStyle([
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    p3_elements.append(p3_header)
    p3_elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#A742FF"), spaceAfter=8))
    
    p3_body = (
        "A vibrant financial dashboard designed to make dense metrics approachable through intuitive charts and bespoke mascot branding.<br/>"
        "&bull; <b>Live Website:</b> <a href='https://dmars.vercel.app/' color='#881337'><u>https://dmars.vercel.app/</u></a> &nbsp;|&nbsp; "
        "<b>Figma File:</b> <a href='https://www.figma.com/design/yVENJJHh1wcJb0jq5xVu1F/DMAR-web-view-and-Mobile-view?node-id=4102-259&p=f&t=BQVu8MNRAkkaHTwG-0' color='#881337'><u>View on Figma</u></a><br/>"
        "&bull; <b>Key Techniques:</b> Dynamic Chart.js configuration, custom design system in Figma with dark neon themes, CSS Grid responsiveness, and dynamic multi-widget state filtering.<br/>"
        "&bull; <b>Tools:</b> React, Chart.js, Tailwind CSS, Antigravity AI, Figma."
    )
    p3_elements.append(Paragraph(p3_body, body_style))
    story.append(KeepTogether(p3_elements))
    story.append(Spacer(1, 14))
    
    # ── PROJECT 4: AURA REAL ESTATE ──
    p4_elements = []
    p4_header = Table([
        [
            Paragraph("<b>04. AURA REAL ESTATE</b> — Luxury Architectural Platform", proj_title_style),
            Paragraph("<b>LUXURY REAL ESTATE • 2025 DEC</b>", proj_tag_style)
        ]
    ], colWidths=[5.4*inch, 2.1*inch])
    p4_header.setStyle(TableStyle([
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    p4_elements.append(p4_header)
    p4_elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#059669"), spaceAfter=8))
    
    p4_body = (
        "A pixel-perfect luxury real estate showcase prioritizing visual storytelling, editorial typography, and seamless property browsing.<br/>"
        "&bull; <b>Live Website:</b> <a href='https://aurarealestate.vercel.app/' color='#881337'><u>https://aurarealestate.vercel.app/</u></a> &nbsp;|&nbsp; "
        "<b>Figma File:</b> <a href='https://www.figma.com/design/gBHrwJxQIJzzFy1iCgE4PI/real-estate?node-id=0-1&p=f&t=BQVu8MNRAkkaHTwG-0' color='#881337'><u>View on Figma</u></a><br/>"
        "&bull; <b>Key Techniques:</b> 12-column structural grid, monochromatic luxury typography hierarchy, interactive property gallery transitions, and GSAP scroll-triggered parallax.<br/>"
        "&bull; <b>Tools:</b> React, Tailwind CSS, Figma, Antigravity AI."
    )
    p4_elements.append(Paragraph(p4_body, body_style))
    story.append(KeepTogether(p4_elements))
    story.append(Spacer(1, 14))
    
    # ── SKILLS & EXPERIENCE SECTION ──
    footer_section = []
    footer_section.append(Paragraph("Core Capabilities &amp; Experience Overview", section_h1))
    
    skills_content = (
        "<b>1. User Research:</b> Pain point translation, interviews, usability tests, competitive benchmarks (Maze, FigJam).<br/>"
        "<b>2. UI/UX Design:</b> Design systems, auto layout, accessible typography tokens, component libraries (Figma).<br/>"
        "<b>3. Prototyping:</b> Micro-interactions, animated states, rapid usability validation (Figma, Framer, GSAP).<br/>"
        "<b>4. Frontend Dev:</b> 1:1 pixel parity, production React, Next.js, TypeScript, Tailwind, GSAP ScrollTrigger.<br/>"
        "<b>5. Backend &amp; Cloud:</b> Supabase relational data &amp; RLS, Render cloud deployments, WebSockets, REST APIs."
    )
    
    exp_content = (
        "<b>UI/UX Internship (Dec 2025 — Mar 2026):</b><br/>"
        "Managed end-to-end design: research, wireframing, high-fidelity UI in Figma, developer handoff, and client reviews.<br/><br/>"
        "<b>AI-Assisted Dev &amp; SaaS (Jan 2026 — Present):</b><br/>"
        "Bridging design to code: translating Figma into production React web apps, full-stack SaaS backends, and active cross-platform mobile apps."
    )
    
    skills_table = Table([
        [Paragraph("<b>SKILLS &amp; TOOLING</b>", meta_label), Paragraph("<b>EXPERIENCE TIMELINE</b>", meta_label)],
        [Paragraph(skills_content, step_desc), Paragraph(exp_content, step_desc)]
    ], colWidths=[3.7*inch, 3.8*inch])
    skills_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    footer_section.append(skills_table)
    story.append(KeepTogether(footer_section))
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    output_path = os.path.join(os.path.dirname(__file__), "Gouki_Portfolio_Projects_Documentation.pdf")
    build_pdf(output_path)
    # Also save a copy in public directory
    public_path = os.path.join(os.path.dirname(__file__), "public", "Gouki_Portfolio_Projects_Documentation.pdf")
    build_pdf(public_path)
