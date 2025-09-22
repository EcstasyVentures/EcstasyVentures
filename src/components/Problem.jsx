import "../styles.css";
import ScrollReveal from './ScrollReveal';
import "../master.css";

export default function Problem() {
    return (
        <section className="section" id="problem">
            <div>
                <h3>The Problem</h3>
                <ScrollReveal

  baseOpacity={0}

  enableBlur={true}

  baseRotation={5}

  blurStrength={10}

>
                    90% of startups fail within five years. The top contributors are
                    product-market fit issues, running out of cash, and a weak or misaligned team.
                    We tackle the last two directly with our service-for-equity model.
                    </ScrollReveal>

                <div className="grid-3">
                    <div className="card">
                        <div style={{fontSize: '35px', fontWeight: '800', color:'#ff6a00'}}>42%</div>
                        <div className="small">No market need</div>
                    </div>
                    <div className="card">
                        <div style={{fontSize: '35px', fontWeight: '800', color:'#ff6a00'}}>29%</div>
                        <div className="small">No funding</div>
                    </div>
                    <div className="card">
                        <div style={{fontSize: '35px', fontWeight: '800', color:'#ff6a00'}}>23%</div>
                        <div className="small">Weak team</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
