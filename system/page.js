(() => {
  const explorer = document.querySelector('.sys-explorer');
  if (!explorer) return;
  const modules = {
    'market-intelligence': {
      label: 'Market Intelligence', context: 'Market review · Competitive pressure', title: 'Read the market before changing the plan.',
      rows: [['Review competitor concessions', 'Market', 'Ready for review'], ['Compare current availability', 'Asset', 'Evidence ready'], ['Update the response plan', 'Revenue', 'Approval needed']],
      card: 'Know which pressure needs a response.', situation: 'A competing property has changed its offer while your available homes are rising.', evidence: 'Market terms, availability, prospect signals, and current lease pace are reviewed together.', decision: 'Compare the cost of a targeted response with protecting the current rate.', action: 'Prepare the recommended move for the property lead to approve.', authority: 'Pricing approval · Property lead', metrics: [['Available homes', '8'], ['Decision', 'Compare options']], disclaimer: 'Illustrative interface. Market conditions and outcomes are examples, not measured customer results.'
    },
    demand: {
      label: 'Demand', context: 'Acquisition review · Lease forecast', title: 'Buy only the demand the asset needs.',
      rows: [['Review incremental demand', 'Acquisition', 'Ready for review'], ['Reallocate paid media', 'Channels', 'Approval needed'], ['Watch lease pace', 'Leasing', 'Monitoring']],
      card: 'Make each dollar earn its place.', situation: 'An existing prospect pipeline may cover some upcoming availability.', evidence: 'Availability, expected conversion, channel costs, and lease pace are visible in one view.', decision: 'Test a smaller spend while protecting a minimum lease volume.', action: 'Prepare a controlled budget adjustment and measurement plan.', authority: 'Budget approval · Marketing lead', metrics: [['Current exposure', '8 homes'], ['Next move', 'Test spend']], disclaimer: 'Illustrative interface. Any savings depend on actual conversion and lease volume.'
    },
    prospects: {
      label: 'Prospects', context: 'Prospect journey · Follow-up review', title: 'See what moves the lease.',
      rows: [['Review stalled prospects', 'Follow-up', 'Ready for review'], ['Match available homes', 'Inventory', 'In progress'], ['Improve next response', 'Leasing', 'Approval needed']],
      card: 'Turn intent into a better conversation.', situation: 'Interested prospects have stopped short of a signed lease.', evidence: 'Questions, preferences, available homes, and timing point to the next useful response.', decision: 'Prioritize relevant follow-up instead of repeating a generic message.', action: 'Prepare a recommended conversation and home match for the leasing team.', authority: 'Communication approval · Leasing lead', metrics: [['Open opportunities', '24'], ['Next move', 'Follow up']], disclaimer: 'Illustrative interface. Prospect counts and outcomes are modeled examples.'
    },
    revenue: {
      label: 'Revenue', context: 'Pricing review · Concession scenario', title: 'Protect rate with evidence.',
      rows: [['Compare concession options', 'Revenue', 'Ready for review'], ['Review pipeline coverage', 'Leasing', 'Evidence ready'], ['Set an approval limit', 'Authority', 'Approval needed']],
      card: 'Choose the offer with the better economics.', situation: 'A blanket concession is being considered for eight available homes.', evidence: 'Expected conversion, vacancy exposure, and total incentive cost are compared.', decision: 'Test whether a targeted offer improves net income more than a blanket credit.', action: 'Present the options and guardrails to the revenue lead.', authority: 'Pricing approval · Revenue lead', metrics: [['Available homes', '8'], ['Decision', 'Compare offers']], disclaimer: 'Illustrative interface. Concession economics depend on actual rents, timing, and lease outcomes.'
    },
    'command-center': {
      label: 'Command Center', context: 'Ownership brief · Annual operating scenario', title: 'An ownership-ready view. An accountable plan.',
      rows: [['Review the operating plan', 'Whole asset', 'Ready for review'], ['Assign the priority actions', 'Three workstreams', 'Owners set'], ['Schedule the ownership brief', 'Monthly reporting', 'Draft ready']],
      card: 'Show what changes. Who owns it. What it is worth.', situation: 'Ownership needs the economic impact, the risks and the next move in one view.', evidence: 'A separate planning scenario assumes $5,000 in recurring net monthly operating savings.', decision: 'Review the net savings assumptions, leasing guardrails and assigned action owners together.', action: 'Generate an editable ownership brief with NOI, net spend, vacancy, lease pace and next steps; set its schedule.', authority: 'Plan and distribution approval · Asset manager', metrics: [['Modeled annual NOI improvement', '+$60,000'], ['Illustrative value impact', '+$1.09M']], disclaimer: '$5,000 net monthly savings × 12 ÷ 5.5% = $1.09M. Assumes durable savings after incremental costs, unchanged income, and a constant cap rate.'
    },
    'seo-llm': {
      label: 'SEO / LLM', context: 'Discovery review · Search and AI answers', title: 'Help the right renter find the right home.',
      rows: [['Review discoverability', 'Search', 'Ready for review'], ['Update availability content', 'Website', 'Approval needed'], ['Measure qualified interest', 'Demand', 'Monitoring']],
      card: 'Connect discovery to leasing needs.', situation: 'Relevant available homes are hard to discover in search and AI answers.', evidence: 'Search visibility, page content, availability, and qualified interest are reviewed together.', decision: 'Prioritize useful content that answers renter questions and reflects live inventory.', action: 'Prepare updates for the website and measure engagement through to lease outcomes.', authority: 'Content approval · Marketing lead', metrics: [['Priority', 'Discovery'], ['Next move', 'Update content']], disclaimer: 'Illustrative interface. Search visibility and leasing outcomes vary by market and execution.'
    },
    influence: {
      label: 'Influence', context: 'Contribution review · Paid media', title: 'It claimed the lease. Did it create it?',
      rows: [['Review channel claims', 'Attribution', 'Ready for review'], ['Compare alternatives', 'Acquisition', 'Test needed'], ['Measure lease lift', 'Outcomes', 'Monitoring']],
      card: 'Measure contribution before protecting spend.', situation: 'A channel claims leases that may already have been likely to sign.', evidence: 'Attributed results, overlapping touchpoints, and total lease volume are compared.', decision: 'Test a smaller budget with a credible comparison and a lease-volume guardrail.', action: 'Prepare the controlled test and review actual incremental contribution.', authority: 'Test approval · Marketing lead', metrics: [['Test', 'Controlled'], ['Measure', 'Lease lift']], disclaimer: 'Illustrative interface. Attribution alone does not establish incremental contribution.'
    },
    'leaser-demand-network': {
      label: 'Leaser Demand Network', context: 'Additional reach · Channel test', title: 'Give the asset another source of demand.',
      rows: [['Test reach beyond ILS', 'LDN', 'Ready for review'], ['Review the channel mix', 'Acquisition', 'Test needed'], ['Measure incremental lift', 'Leasing', 'Required']],
      card: 'Earn the right to depend less on ILS.', situation: 'The asset needs additional demand beyond its existing channel mix.', evidence: 'Audience signals, availability, approved areas, and channel costs define a test.', decision: 'Evaluate whether an LDN test creates enough incremental leases to justify the spend.', action: 'Prepare the test with targeting and budget approval; measure total lease volume.', authority: 'Spend and targeting approval · Marketing lead', metrics: [['Status', 'In development'], ['Next move', 'Test reach']], disclaimer: 'Illustrative interface. The Leaser Demand Network is in development; results are not measured customer outcomes.'
    }
  };
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];
  const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  function select(key, focus = false) {
    const data = modules[key]; if (!data) return;
    tabs.forEach(tab => { const active = tab.dataset.module === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
    set('preview-label', `${data.label} · Product preview`); set('preview-context', data.context); set('preview-title', data.title);
    data.rows.forEach((row, i) => { set(`preview-row-${i + 1}`, row[0]); set(`preview-context-${i + 1}`, row[1]); set(`preview-status-${i + 1}`, row[2]); });
    for (const field of ['card', 'situation', 'evidence', 'decision', 'action', 'authority', 'disclaimer']) set(`preview-${field === 'card' ? 'card-title' : field}`, data[field]);
    data.metrics.forEach((metric, i) => { set(`preview-metric-label-${i + 1}`, metric[0]); set(`preview-metric-${i + 1}`, metric[1]); });
    set("preview-metric-description-1", key === "command-center" ? "A performance story grounded in net economics." : "Illustrative scenario, not a measured customer result.");
    set("preview-metric-description-2", key === "command-center" ? "At an unchanged 5.5% cap rate." : "Review the evidence before taking action.");
    document.getElementById("sys-preview-panel").setAttribute("aria-labelledby", `sys-tab-${key}`);
    document.getElementById('module-example-link').href = `/system/examples/#${key}`;
    document.getElementById('preview-action-link').href = `/system/examples/#${key}`;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.module));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[next].dataset.module, true);
    });
  });
  const hash = decodeURIComponent(window.location.hash.slice(1));
  select(modules[hash] ? hash : 'command-center');
})();
